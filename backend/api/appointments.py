"""
Module that contains all appointments route like

getAppointment (single and multiple appointments)
bookAppointment
cancelAppointment
rescheduleAppointment

Routes for doctors schedule like
addSchedule
editSchedule
deleteSchedule
getSchedules (single and multiple schedules)

"""

from api import db
from flask import Blueprint, request, jsonify
from datetime import datetime, timedelta
from flask_jwt_extended import jwt_required
from sqlalchemy import or_, and_
from api.models import Mentee, Mentor, Appointment, TimeSlots


bookings = Blueprint('bookings', __name__)


@bookings.route('/getTimeSlot/<int:id>', methods=['GET'])
# @jwt_required()
def getTimeSlot(id):
    try:
        time_slot = TimeSlots.query.get(id)
        
        if time_slot is None:
            return jsonify({'error' : 'time slot not found'}), 400
        return jsonify({
            'id': time_slot.id,
            'mentor_id': time_slot.mentor_id,
            'start_time': time_slot.start_time.strftime('%H:%M %p'),
            'end_time': time_slot.end_time.strftime('%H:%M %p'),
            'agreed_day': time_slot.agreed_day,
            }), 200
    except Exception as error:
        print(str(error))
        return jsonify({'error' : 'server error'}), 500


@bookings.route('/getTimeSlots', methods=['GET'], strict_slashes=False)
# @jwt_required()
def getTimeSlots():
    time_slots = TimeSlots.query.all()
    time_slots_data = [{
        'id': slot.id,
        'mentor_id': slot.mentor_id,
        'start_time': slot.start_time.strftime('%H:%M %p'),
        'end_time': slot.end_time.strftime('%H:%M %p'),
        'agreed_day': slot.agreed_day,
    } 
    for slot in time_slots
    ]
    return jsonify({"Time Slots" : time_slots_data}), 200


@bookings.route("/addTimeSlot", methods=["POST"], strict_slashes=False)
# @jwt_required()
def createTimeSlot():
    try:
        data = request.get_json()
    
        # Parse start_time and end_time into datetime objects
        mentor_id = data.get("mentor_id")
        start_time_str = data.get("start_time")
        end_time_str = data.get("end_time")
        agreed_day = data.get("agreed_day")
        

        if mentor_id is None:
            return jsonify({"error" : "mentor id is required"}), 400

        mentor = Mentor.query.get(mentor_id)
        if mentor is None:
            return jsonify({"error" : f"mentor with id of {mentor_id} does not exist"}), 400

        if agreed_day is None:
            return jsonify({"error" : "Day of the week is required"}), 400

        # Validate agreed_day
        valid_days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
    
        if agreed_day not in valid_days:
            return jsonify({"error": "Invalid agreed_day"}), 400
    
        if start_time_str is None or end_time_str is None:
            return jsonify({"error" : "start and end time is required"}), 400
            
        try:
            start_time = datetime.strptime(start_time_str, "%I:%M %p").time()
            end_time = datetime.strptime(end_time_str, "%I:%M %p").time()
        
        except ValueError as error:
            return jsonify({"error": "invalid time format"}), 400
    
        
        timeSlot = TimeSlots.query.filter(
                TimeSlots.mentor_id==mentor_id,
                TimeSlots.start_time>=start_time,
                TimeSlots.end_time<=end_time,
                TimeSlots.agreed_day==agreed_day
                ).all()

        if timeSlot:
            return jsonify({'error' : 'Time Slot already exists'}), 409

        time_slot = TimeSlots(
                mentor_id=mentor_id,
                start_time=start_time,
                end_time=end_time,
                agreed_day=agreed_day)

        db.session.add(time_slot)
        db.session.commit()
        return jsonify({"message": "Time slot created successfully"}), 201
    
    except Exception as e:
        db.session.rollback()
        print(str(e))
        return jsonify({"error": "Failed to create time slot"}), 500


@bookings.route('/updateTimeSlot/<int:id>', methods=['PUT'], strict_slashes=False)
# @jwt_required()
def updateTimeSlot(id):
    '''
      update time slot
    '''
    try:
        data = request.get_json()
        timeSlot = TimeSlots.query.get(id)

        if timeSlot is None:
            return jsonify({"error" : "Time Slot does not exist"}), 400
    
        # Parse start_time and end_time into datetime objects
        start_time_str = data.get("start_time")
        end_time_str = data.get("end_time")
        agreed_day = data.get("agreed_day")
    
        if start_time_str:
            try:
                start_time = datetime.strptime(start_time_str, '%I:%M %p').time()
            except ValueError as sve:
                return jsonify({"error" : "time format is incorrect"}), 400
            timeSlot.start_time = start_time

        
        if end_time_str:
            try:
                end_time = datetime.strptime(end_time_str, '%H:%M %p').time()
            except ValueError as e:
                return jsonify({"error": "invalid time format"}), 400
            timeSlot.end_time = end_time
        
        # Validate agreed_day
        if agreed_day:
            valid_days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
            
            if agreed_day not in valid_days:
                return jsonify({"error": "Invalid day of the week"}), 400
            timeSlot.agreed_day = agreed_day
    
        mentor_id = data.get("mentor_id")

        if mentor_id:
            mentor = Mentor.query.get(mentor_id)
            if mentor is None:
                return jsonify({"error" : f"mentor with the id {mentor_id} does not exist"}), 400

        db.session.commit()
        
        return jsonify({"message": "Time slot updated successfully"}), 200
    
    except Exception as e:
        db.session.rollback()
        print(str(e))
        return jsonify({"error": "Failed to update time slot"}), 500


@bookings.route('/delTimeSlot/<int:id>', methods=['DELETE'], strict_slashes=False)
# @jwt_required()
def delTimeSlot(id):
    time_slot = TimeSlots.query.get(id)
    
    if time_slot is None:
        return jsonify({'message': 'Time slot not found'}), 404

    try:
        db.session.delete(time_slot)
        db.session.commit()

        return jsonify({'message': 'Time slot deleted successfully'}), 200

    except Exception as e:
        db.session.rollback()
        print(str(e))
        return jsonify({'error': 'your request failed while processing'}), 500


@bookings.route('/availTimeSlots/', methods=['GET'], strict_slashes=False)
def availTimeSlots():
    """
    Determine the available appointments timeslots for the choosen date    
    """
    # Extract date from request object
    try:
        # data = request.get_json()
        # date_str = data.get('dateChoosen')

        date_str = request.args.get('dateChoosen')

        if date_str is None:
            return jsonify({'error':'No date choosen'}), 400

        try:
            # Date is not less than today
            date = datetime.strptime(date_str, '%Y-%m-%d')

            if date.date() < datetime.today().date():
                return jsonify({'error' : 'date must be later than now'}), 400
        
        except ValueError as ve:
            return jsonify({'error' : str(ve)}), 400

        # Find the day corresponding to the booked date
        day = date.strftime('%A')

        # Find all schedule corresponding to the said day
        matchedTimeSlots = TimeSlots.query.filter(
                or_(
                    TimeSlots.agreed_day==day,
                    TimeSlots.agreed_day=='Everyday'
                    )
                ).all()

        if not matchedTimeSlots:
            return jsonify({'error': 'No available slot for the selected date'}), 404

        print(f"{matchedTimeSlots}")
    
        # Define list of all schedules
        allTimeSlots = []

        # Create available timeslot list for date selected
        for timeSlot in matchedTimeSlots:
    
            doctorAppts = Appointment.query.filter(
                        Appointment.mentor_id==timeSlot.mentor_id,
                        Appointment.timeslot_id==timeSlot.id,
                        Appointment.date_of_appointment==date.date(),
                        Appointment.status=='Scheduled'
                    ).all()

            print(f"{doctorAppts}")
            print(f"{date}")

            # Get doctor with schedule information
            doctor = Doctors.query.get(timeSlot.mentor_id)
        
            # Get doctors with exception on the choosen date
            exception = Exceptions.query.filter_by(
                        mentor_id=timeSlot.mentor_id,
                        date_of_exception=date
                    ).first()

            # Exclude doctors with exceptions
            if exception:
                continue
        
            # Create a dictionary with doctor schedule
            timeslot_item = {
                'time slot id' : timeSlot.id,
                'slot day' : timeSlot.agreed_day,
                'start time' : timeSlot.start_time.strftime('%H:%M %p'),
                'end time' : timeSlot.end_time.strftime('%H:%M %p'),
                'doctor id' : timeSlot.mentor_id,
                'doctor name' : f"{doctor.first_name} {doctor.last_name} {doctor.other_name}",
                'Patients on queue' : len(doctorAppts)
                }

            # Append schedule to all schedules
            allTimeSlots.append(timeslot_item)
    
        return jsonify({'availTimeSlots' : allTimeSlots }), 200

    except Exception as ex:
        print(str(ex))
        return jsonify({'error' : 'An error occurred while proccessing the request'}), 500


@bookings.route("/bookAppt", methods=["POST"], strict_slashes=False)
def bookAppointment():
    """
    Book an appointment

    Args:
        Json - containing all appointment details

    Return:
        dict - JSON dictionary with status of book
    """
    # Get data from request
    try:
        data = request.get_json()
    
        mentor_id = data.get('mentor_id')
        patient_id = data.get('patient_id')
        timeslot_id = data.get('timeslot_id')
        date_of_appointment = data.get('date')
        notes = data.get('notes')

        if mentor_id is None or patient_id is None or timeslot_id is None or date_of_appointment is None:
            return jsonify({'error' : 'doctor id, patient id, timeslot id and date of appointment are required'}), 400
        
        try:
            apptDate = datetime.strptime(date_of_appointment, '%Y-%m-%d')

        except ValueError as date_conversion_error:
            return jsonify({"error" : f"Invalid date format {date_conversion_error}"}), 400


        newAppt = Appointment(
            mentor_id=mentor_id,
            patient_id=patient_id,
            timeslot_id=timeslot_id,
            date_of_appointment=apptDate,
            notes=notes
            )
    
        db.session.add(newAppt)
        db.session.commit()

        return jsonify({
                    'status' : 'appointment booked successfully',
                    'appointment id' : newAppt.id
                }), 200

    except Exception as ex:
        db.session.rollback()
        print(str(ex))
        return jsonify({'error' : 'An error occurred while processing the request'}), 500


@bookings.route('/cancelAppt/<int:id>', methods=['PUT'], strict_slashes=False)
def cancelAppt(id):
    """
    Cancel an appointment

    Args:
        id - Appointment id

    Return:
        JSON - Status of operation

    """
    try:
        appointment = Appointment.query.get(id)

        if not appointment:
            return jsonify({'error': 'appointment not found'}), 400

        if appointment.status == 'Cancelled':
            return jsonify({'status': 'appointment already canceled'}), 401

        if appointment.status == 'Completed':
            return jsonify({'status' : 'appointment already completed'}), 401

        appointment.status = 'Cancelled'

        db.session.commit()
        return jsonify({'status' : 'successfully canceled'}), 200
    except Exception as e:
        print(str(e))
        return jsonify({'error':'server error'}), 500


@bookings.route('/completeAppt/<int:id>', methods=['PUT'], strict_slashes=False)
def completeAppt(id):
    """
    Complete an appointment
    """
    appointment = Appointment.query.get(id)

    if not appointment:
        return jsonify({'error': 'appointment not found'}), 400
    
    if appointment.status == 'cancelled' or appointment.status == 'completed':
        return ({'status': 'Appointment canceled or completed'}), 404

    appointment.status = 'Completed'

    db.session.commit()
    return jsonify({'status' : 'appointment completed'}), 200


@bookings.route('/getAppt/<int:id>', methods=['GET'], strict_slashes=False)
def getAppointment(id):
    """
    Return an appointment data

    Args:
        id - id of the requested appointment

    Return:
        Dict - dictionary of appointment data

    """
    try:
    # Get appointment from database
        appointment = Appointment.query.get(id)

        if appointment is None:
            raise ValueError('No data found')

        timeSlot = TimeSlots.query.get(appointment.timeslot_id)

        return jsonify({
            'appointment id' : appointment.id,
            'mentee id' : appointment.mentee_id,
            'mentor id' : appointment.mentor_id,
            'date' : datetime.strftime(appointment.date_of_appointment, '%Y-%m-%d'),
            'time id' : appointment.timeslot_id, # dateime.isoformat(timeSlot.time.time())
            'status' : appointment.status
            }), 200

    except ValueError as e:
        return jsonify({'error': str(e)}), 400


@bookings.route('/getMentorAppts/', methods=['GET'], strict_slashes=False)
def getMentorAppt():
    """
    Get a doctors appointments

    Args:
        id - Doctor's id

    Return:
        List - list of dictionaries of a doctor's appointments
    """
    try:
        data = request.get_json()

        if data is None:
            raise ValueError('No JSON data provided')

        mentor_id = data.get('mentor_id')
        appointments = Appointment.query.filter_by(mentor_id=mentor_id).all()

        mentorAppts = [{
                        'appointment_id' : appointment.id,
                        'appointment date' : datetime.strftime(appointment.date_of_appointment, '%Y-%m-%d'),
                        'mentor id' : appointment.mentor_id,
                        'mentee id' : appointment.mentor_id,
                        'time id' : appointment.timeslot_id,
                        'status' : appointment.status
                    }
                    for appointment in appointments
                ]
        return jsonify({'appointments' : mentorAppts}), 200
    
    except ValueError as e:
        return jsonify({'error': str(e)}), 400


@bookings.route('/getAllAppts/', methods=['GET'], strict_slashes=False)
def getAllAppt():
    """
    Get all appointments
    """
    try:
        appointments = Appointment.query.all()

        appts = [
                {'appointment_id' : appointment.id,
                'appointment date' : datetime.strftime(appointment.date_of_appointment, '%Y-%m-%d'),
                'doctor id' : appointment.mentor_id,
                'patient id' : appointment.patient_id,
                'time slot id' : appointment.timeslot_id,
                'status' : appointment.status,
                'notes' : appointment.notes
                } 
                for appointment in appointments
                ]
    
        if not appts:
            return jsonify({'status' : 'no appointments'}), 200
        
        return jsonify({'appointments' : appts}), 200
    
    except ValueError as e:
        return jsonify({'error' : str(e)}), 400

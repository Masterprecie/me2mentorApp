""" package imports"""

from datetime import datetime
from api import db


class Mentor(db.Model):
    """
        Mentor class with full descriptions
    """
    __tablename__ = 'mentors'
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(20), nullable=False)
    last_name = db.Column(db.String(20), nullable=False)
    age = db.Column(db.Integer, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    username = db.Column(db.String(20), unique=True, nullable=False)
    password = db.Column(db.String(60), nullable=False)
    profile_picture = db.Column(db.String(255), nullable=False, default='default.jpg')
    expertise = db.Column(db.String(120), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    mentees = db.relationship('Mentee', backref='mentor', lazy=True)
    mentee_appointment = db.relationship('Appointments', backref='mentor', lazy=True)


    def __repr__(self):
        return (
            f"Mentor('{self.username}', '{self.email}', '{self.age}', '{self.expertise}'"
            f"'{self.first_name}', '{self.last_name}', '{self.profile_picture}')"
        )


class Mentee(db.Model):
    """
        Mentee class with full descriptions
    """
    __tablename__ = 'mentees'
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(20), nullable=False)
    last_name = db.Column(db.String(20), nullable=False)
    age = db.Column(db.Integer, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    username = db.Column(db.String(20), unique=True, nullable=False)
    password = db.Column(db.String(60), nullable=False)
    profile_picture = db.Column(db.String(255), nullable=False, default='default.jpg')
    interests = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    mentor_id = db.Column(db.Integer, db.ForeignKey('mentor.id'), nullable=True)


    def __repr__(self):
        return (
            f"Mentor('{self.username}', '{self.email}', '{self.age}', '{self.interests}'"
            f"'{self.first_name}', '{self.last_name}', '{self.profile_picture}')"
        )


class Appointment(db.Model):
    '''
        Appointment class for mentor and mentees
    '''
    __tablename__ = 'appointments'
    id = db.Column(db.Integer, primary_key=True)
    mentee_id = db.Column(db.Integer, db.ForeignKey('mentee.id'), nullable=False, index=True)
    mentor_id = db.Column(db.Integer, db.ForeignKey('mentor.id'), nullable=False, index=True)
    appointment_date = db.Column(db.Date, nullable=False)
    status = db.Column(db.String(10), nullable=False, default='Scheduled')
    timeslot_id = db.Column(db.Integer, db.ForeignKey('timeslots.id'), nullable=False)

    def __repr__(self):
        return (
            f"Appointment('{self.id}', '{self.mentee_id}', {self.mentor_id}'"
            f"''{self.appointment_date}', '{self.status}')"
        )


class TimeSlots(db.Model):
    '''
        time slot for mentor mentee meeting
    '''
    __tablename__ = 'timeslots'
    id = db.Column(db.Integer, primary_key=True)
    mentor_id = db.Column(db.Integer, db.ForeignKey('mentor.id'), nullable=False)
    start_time = db.Column(db.Time, nullable=False)
    end_time = db.Column(db.Time, nullable=False)
    agreed_day = db.Column(db.String(10), nullable=False, default='Everyday')
    timeslots_appointment = db.relationship('Appointment', backref='timeslots', lazy=True)

    def __repr__(self):
        return (
            f"TimeSlot('{self.id}': '{self.mentor_id}' '{self.agreed_day}'"
            f"'{self.start_time}' '{self.end_time}')"
        )


class MenteeMentor(db.Model):
    """
        Mentee - Mentor relationship class
    """
    __tablename__ = 'mentee_mentor'
    mentee_mentor_id = db.Column(db.Integer, primary_key=True)
    mentee_id = db.Column(db.Integer, db.ForeignKey('mentee.id'))
    mentor_id = db.Column(db.Integer, db.ForeignKey('mentor.id'))
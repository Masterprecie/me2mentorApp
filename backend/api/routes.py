from flask import request, jsonify, Blueprint, session
from api import db, bcrypt
from api.models import Mentor, Mentee
from backend.api.schemas import mentee_schema, mentees_schema, mentor_schema, mentors_schema


api = Blueprint('api', __name__)



@api.route("/")
@api.route("/landing_page", methods=['GET', 'POST'])
def landing_page():
    return jsonify({'message': 'Welcome to the landing page!'})


@api.route("/about")
def about():
    return jsonify({'message': 'This is the About page!'})


################----------------------------Mentee Routes----------------------------##############
@api.route("/mentee_register", methods=['GET', 'POST'])
def mentee_register():
    '''
        a register function for the mentee route
    '''
    try:
        # Parse JSON data from the request
        data = request.get_json()

        # Load (deserialize) the JSON data using MenteeSchema
        mentee = mentee_schema.load(data)

        # Checks if email already exists in the db.
        existing_mentee = Mentee.query.filter_by(email=mentee.email).first()
        if existing_mentee:
            return "Email already exists", 409

        db.session.add(mentee)
        db.session.commit()
        return mentee_schema.jsonify(mentee), 201

    except Exception as e:
        return str(e), 400
    

@api.route("/all_mentees", methods=['GET'])
#@login_required
def get_mentees():
    '''function to get all mentees in the database'''
    all_mentees = Mentee.query.all()
    result = mentees_schema.dump(all_mentees)
    return jsonify(result)


@api.route('/mentee_<int:mentee_id>', methods=['GET'])
def single_mentee(mentee_id):
    '''
        method to get a single mentee
    '''
    single_mentee = Mentee.query.get(mentee_id)
    return mentee_schema.jsonify(single_mentee)

@api.route("/mentee/logout", methods=['POST'])
# @login_required
def mentee_logout():
    '''
        logout funtion for the mentee route
    '''
    try:
        # Clear the user's session to log them out
        session.clear()
        return jsonify({"message": "Logout successful"}), 200

    except Exception as e:
        return str(e), 400
    

@api.route("/mentee/account", methods=['GET', 'POST'])
#@login_required
def update_mentee():
    '''
    function to update the mentee's account
    '''
    try:
        # Find the Mentee by ID
        mentee = db.session.get(Mentee, Mentee.mentee_id)

        if not mentee:
            return "Mentee not found", 404

        # Parse JSON data from the request
        data = request.get_json()

        # Update the Mentee object with the new data
        mentee.first_name = data.get('first_name', mentee.first_name)
        mentee.last_name = data.get('last_name', mentee.last_name)
        mentee.email = data.get('email', mentee.email)
        mentee.username = data.get('username', mentee.username)
        mentee.age = data.get('age', mentee.age)

        # Commit the changes to the database
        db.session.commit()

        # Serialize the updated Mentee and return it as JSON
        return mentee_schema.jsonify(mentee), 200

    except Exception as e:
        return str(e), 400


################----------------------------Mentor Routes----------------------------##############

@api.route("/mentor_register", methods=['GET', 'POST'])
def mentor_register():
    '''
        a register function for the mentee route
    '''
    try:
        # Parse JSON data from the request
        data = request.get_json()
        password = data.get('password')

        hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

        # Load (deserialize) the JSON data using MentorSchema
        mentor = mentor_schema.load(data)

        # Checks if email already exists in the db.
        existing_mentor = Mentor.query.filter_by(email=mentor.email).first()
        if existing_mentor:
            return "Email already exists", 409

        db.session.add(mentor)
        db.session.commit()
        return mentor_schema.jsonify(mentor), 201

    except Exception as e:
        return str(e), 400


@api.route("/all_mentors", methods=['GET'])
#@login_required
def get_mentors():
    '''function to get all mentors in the database'''
    all_mentors = Mentor.query.all()
    result = mentors_schema.dump(all_mentors)
    return jsonify(result)


@api.route('/mentor_<int:mentor_id>', methods=['GET'])
def single_mentor(mentor_id):
    '''
        method to get a single mentee
    '''
    single_mentor = Mentor.query.get(mentor_id)
    return mentor_schema.jsonify(single_mentor)


@api.route("/mentors/logout", methods=['POST'])
# @login_required
def mentor_logout():
    '''
        logout funtion for the mentor route
    '''
    try:
        # Clear the user's session to log them out
        session.clear()
        return jsonify({"message": "Logout successful"}), 200

    except Exception as e:
        return str(e), 400
    

@api.route("/mentor/account", methods=['GET', 'POST'])
#@login_required
def update_mentor():
    '''
    function to update the mentee's account
    '''
    try:
        # Find the Mentor by ID
        mentor = db.session.get(Mentor, Mentor.mentor_id)

        if not mentor:
            return "Mentor not found", 404

        # Parse JSON data from the request
        data = request.get_json()

        # Update the Mentor object with the new data
        mentor.first_name = data.get('first_name', mentor.first_name)
        mentor.last_name = data.get('last_name', mentor.last_name)
        mentor.email = data.get('email', mentor.email)
        mentor.username = data.get('username', mentor.username)
        mentor.age = data.get('age', mentor.age)

        # Commit the changes to the database
        db.session.commit()

        # Serialize the updated Mentor and return it as JSON
        return mentor_schema.jsonify(mentor), 200

    except Exception as e:
        return str(e), 400
''' Module import statements
'''
from flask import Blueprint, jsonify, request, session
from flask_login import login_user, current_user, logout_user, login_required
from mentorapp import db, bcrypt
from mentorapp.models import Mentor
from mentorapp.schemas import MentorSchema
from mentorapp.mentors.utils import save_picture, send_reset_email

mentors = Blueprint('mentors', __name__)

mentor_schema = MentorSchema()
mentors_schema = MentorSchema(many=True)

@mentors.route("/api/register", methods=['GET', 'POST'])
def register():
    '''
        a register function for the mentor route
    '''
    try:
        # Parse JSON data from the request
        data = request.get_json()

        # Load (deserialize) the JSON data using MenteeSchema
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



@mentors.route("/api/login", methods=['GET', 'POST'])
def login():
    '''
        login funtion for the mentor route
    '''
    # data sent from react in JSON
    data = request.json

    # Validate the data received from React
    if not all(key in data for key in ('email', 'password')):
        return jsonify({'message': 'Incomplete data'}), 400

    # Find the mentor by email
    mentor = Mentor.query.filter_by(email=data['email']).first()

    # Check if the mentor exists and the password is correct
    if mentor and bcrypt.check_password_hash(mentor.password_hash, data['password']):
        login_user(mentor)
        return jsonify({'message': 'Login successful'})

    return jsonify({'message': 'Login Unsuccessful. Please check email and password'}), 401


@mentors.route('/<int:mentor_id>', methods=['GET'])
def singleMentor(mentor_id):
    '''
        method to get a single mentee
    '''
    single_mentor = Mentor.query.get(mentor_id)
    return mentor_schema.jsonify(single_mentor)


@mentors.route("/logout", methods=['POST'])
@login_required
def logout():
    '''
        logout funtion for the mentor route
    '''
    try:
        # Clear the user's session to log them out
        session.clear()
        return jsonify({"message": "Logout successful"}), 200

    except Exception as e:
        return str(e), 400



@mentors.route("/api/account", methods=['GET', 'POST'])
@login_required
def update_account():
    '''
    function to update the mentor's account
    '''
    try:
        # Find the Mentor by ID
        mentor = db.session.get(Mentor, id)

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



@mentors.route("/api/reset_password", methods=['GET', 'POST'])
def reset_request():
    '''
        function to reset the password
    '''
    # data sent from react in JSON
    data = request.json

    # Validate the data received from React
    if not all(key in data for key in ('email',)):
        return jsonify({'message': 'Incomplete data'}), 400

    mentor = Mentor.query.filter_by(email=data['email']).first()

    if mentor:
        send_reset_email(mentor)
    # Send a reset email regardless of whether the email exists or not
    # This helps prevent information leakage
    return jsonify({'message': 
                    'An email has been sent with instructions to reset your password.'}), 200


@mentors.route("/api/reset_password/<token>", methods=['GET', 'POST'])
def reset_token(token):
    '''
    function to get the reset token to reset password
    '''
    # data sent from react in JSON
    data = request.json

    # Validate the data received from React
    if not all(key in data for key in ('password',)):
        return jsonify({'message': 'Incomplete data'}), 400

    user = Mentor.verify_reset_token(token)

    if user is None:
        return jsonify({'message': 'That is an invalid or expired token'}), 400

    # Hash the new password and update it
    hashed_password = bcrypt.generate_password_hash(data['password']).decode('utf-8')
    user.password_hash = hashed_password
    db.session.commit()

    return jsonify({'message': 'Your password has been updated! You are now able to log in'}), 200
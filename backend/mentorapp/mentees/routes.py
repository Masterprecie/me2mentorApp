''' Module import statements
'''
from flask import Blueprint, jsonify, request, session
from flask_login import login_user, current_user, logout_user, login_required
from mentorapp import db, bcrypt
from mentorapp.models import Mentee
from mentorapp.schemas import MenteeSchema
from mentorapp.mentees.utils import save_picture, send_reset_email

mentees = Blueprint('mentees', __name__)

mentee_schema = MenteeSchema()
mentees_schema = MenteeSchema(many=True)





@mentees.route("/login", methods=['GET', 'POST'])
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
    mentee = Mentee.query.filter_by(email=data['email']).first()

    # Check if the mentee exists and the password is correct
    if mentee and bcrypt.check_password_hash(mentee.password_hash, data['password']):
        login_user(mentee)
        return jsonify({'message': 'Login successful'})

    return jsonify({'message': 'Login Unsuccessful. Please check email and password'}), 401



@mentees.route("/api/reset_password", methods=['GET', 'POST'])
def reset_request():
    '''
        function to reset the password
    '''
    # data sent from react in JSON
    data = request.json

    # Validate the data received from React
    if not all(key in data for key in ('email',)):
        return jsonify({'message': 'Incomplete data'}), 400

    mentee = Mentee.query.filter_by(email=data['email']).first()

    if mentee:
        send_reset_email(mentee)
    # Send a reset email regardless of whether the email exists or not
    # This helps prevent information leakage
    return jsonify({'message':
                    'An email has been sent with instructions to reset your password.'}), 200


@mentees.route("/api/reset_password/<token>", methods=['GET', 'POST'])
def reset_token(token):
    '''
    function to get the reset token to reset password
    '''
    # data sent from react in JSON
    data = request.json

    # Validate the data received from React
    if not all(key in data for key in ('password',)):
        return jsonify({'message': 'Incomplete data'}), 400

    user = Mentee.verify_reset_token(token)

    if user is None:
        return jsonify({'message': 'That is an invalid or expired token'}), 400

    # Hash the new password and update it
    hashed_password = bcrypt.generate_password_hash(data['password']).decode('utf-8')
    user.password_hash = hashed_password
    db.session.commit()

    return jsonify({'message': 'Your password has been updated! You are now able to log in'}), 200

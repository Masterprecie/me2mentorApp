"""
This file contains routes for the main application
"""
from flask import Blueprint, jsonify, request
from api import db
from api.models import Mentee, Mentor, ContactUs
from api.schemas import contact_schema, contacts_schema

main = Blueprint('main', __name__)

all_users = {'mentees': Mentee, 'mentors': Mentor}

def user_present(email: str) -> bool:
    '''
        function to check if the user(mentor or mentee) is present in the db
    '''
    for user_type, user_value in all_users.items():
        real = user_value.query.filter_by(email=email).first()
        if real:
            return [real, user_type]
    return None


@main.route('/', methods=['GET'])
def index():
    """ JSON file """
    return jsonify({'Status': 'Ok'}), 200

@main.route('/contactus', methods=['POST'])
def contact_us():
    '''
        contact form function
    '''
    try:
        data = request.get_json()

        contact = contact_schema.load(data)
        db.session.add(contact)
        db.session.commit()
        return contact_schema.jsonify(contact), 201
    
    except Exception as error:
        return str(error), 400


@main.route('/contactResponses', methods=['GET'])
def get_contact_us():
    '''
        get contact form reports
    '''
    contact_responses = ContactUs.query.all()
    result = contacts_schema.dump(contact_responses)
    return jsonify(result), 201
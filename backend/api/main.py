"""
This file contains routes for the main application
"""
from flask import Blueprint, jsonify
from api.models import Mentee, Mentor

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


@main.route('/', methods=['GET'], strict_slashes=False)
def index():
    """ JSON file """
    return jsonify({'Status': 'Ok'}), 200
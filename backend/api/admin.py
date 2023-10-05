'''
  admin imports
'''

from flask import Blueprint, jsonify, request, redirect, session, url_for
from api import db
from api.models import Mentor, Mentee, Admin
from api.schemas import mentor_schema, mentors_schema, mentee_schema, mentees_schema
from flask_jwt_extended import jwt_required


admins = Blueprint('admins', __name__)

@admins.route('/login', methods=['POST'])
def admin_login():
    '''
      admin login route
    '''
    try:
        data = request.get_json()
        username = data['username']
        password = data['password']

        admin = Admin.query.filter_by(username=username).first()

        if admin and password:
            return jsonify({'message': 'Administrative Login successful'}), 200
        else:
            return jsonify({'message': 'Administrative login failed'})
        
    except Exception as error:
        return jsonify({'error': str(error)}), 400

@admins.route('/logout', methods=['GET'])
@jwt_required()
def admin_logout():
    '''
        admin logout route
    '''
    try:
        session.clear()
        return redirect(url_for('admin_login'))

    except Exception as error:
        return str(error), 400

#####---------------------mentee side-----------------##########

@admins.route('/mentee/<int:id>', methods=['GET', 'POST', 'PUT', 'DELETE'])
#@jwt_required()
def single_mentee(id):
    '''
        method to get a single mentee
    '''
    mentee = Mentee.query.get(id)
    return mentee_schema.jsonify(mentee)

@admins.route("/all_mentees", methods=['GET', 'POST', 'PUT', 'DELETE'])
def get_mentees():
    '''
        function to get all mentees in the database
    '''
    all_mentees = Mentee.query.all()
    result = mentees_schema.dump(all_mentees)
    return jsonify(result)


@admins.route("/delete_mentee/<int:id>", methods=["DELETE"])
@jwt_required()
def delete_mentee():
    '''
        route to delete a specific mentee
    '''
    mentee = Mentee.query.get(id)
    if mentee:
        db.session.delete(mentee)
        db.session.commit()
        return jsonify({"message": "Mentee removed successfully"}), 200
    else:
        return jsonify({"message": "Mentee not found"}), 404


#####---------------------mentor side-----------------##########

@admins.route("/all_mentors", methods=['GET'])
def get_mentors():
    '''function to get all mentors in the database'''
    all_mentors = Mentor.query.all()
    result = mentors_schema.dump(all_mentors)
    return jsonify(result)

@admins.route("/mentor/<int:id>", methods=['GET'])
def single_mentor(id):
    '''
        method to get a single mentor
    '''
    mentor = Mentor.query.get(id)
    return mentor_schema.jsonify(mentor)

@admins.route("/delete_mentor/<int:id>", methods=["DELETE"])
@jwt_required()
def delete_mentor():
    '''
        route to delete a specific mentor
    '''
    mentor = Mentor.query.get(id)
    if mentor:
        db.session.delete(mentor)
        db.session.commit()
        return jsonify({"message": "Mentor removed successfully"}), 200
    else:
        return jsonify({"message": "Mentor not found"}), 404
    

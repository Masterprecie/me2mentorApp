'''
    mentee - mentor imports
'''
from flask import Blueprint, jsonify, request
from api import db
from api.main import user_present
from api.models import Mentor
from api.schemas import mentor_schema, mentors_schema
from flask_jwt_extended import jwt_required
from passlib.hash import bcrypt_sha256


mentors = Blueprint('users', __name__)

@mentors.route("/getMentors/<int:id>", methods=["GET"])
@jwt_required()
def single_mentor(id):
    '''
        method to get a single mentor
    '''
    mentor = Mentor.query.get(id)
    return mentor_schema.jsonify(mentor)


@mentors.route("/mentor_register", methods=["POST"])
#@jwt_required()
def mentor_register():
    '''
        a register function for the mentors
    '''
    data = request.get_json()

    email = data.get("email")
    
    if user_present(email):
        return jsonify({'error' : 'email already exists'}), 400
    
    first_name = data.get("first_name")
    last_name = data.get("last_name")
    age = data.get("age")
    username = data.get("username")
    gender = data.get("gender")
    plain_password = data.get("password")
    expertise = data.get("expertise")
    experience = data.get("experience")
    
    hashed_password = bcrypt_sha256.hash(plain_password)

    new_mentor = Mentor(
            first_name=first_name,
            last_name=last_name,
            age=age,
            email=email,
            username=username,
            gender=gender, 
            expertise=expertise,
            experience=experience, 
            password=hashed_password
            )

    try:
        db.session.add(new_mentor)
        db.session.commit()
        return jsonify({"message": "Mentor joined successfully"}), 201
    except Exception as error:
        print(str(error))
        return jsonify({"message": "Failed to add mentor"}), 500


@mentors.route('/mentor/login', methods=['POST'])
def mentor_login():
    '''
        mentor login route
    '''
    try:
        data = request.get_json()
        email = data['email']
        plain_password = data['password']

        mentor = Mentor.query.filter_by(email=email).first()

        if mentor and bcrypt_sha256.verify(plain_password, mentor.password):
            return jsonify({'message': 'Login Successful'}), 200
        else:
            return jsonify({'message': 'Login failed'}), 401
    
    except Exception as error:
        return jsonify({"error": str(error)}), 400


@mentors.route("/update_mentor/<int:id>", methods=["PUT"])
@jwt_required()
def update_mentor(id):
    '''
        route to update the mentor
    '''
    mentor = Mentor.query.get(id)
    if not mentor:
        return jsonify({"message": "Mentor not found"})
    try:
        data = request.get_json()
        mentor.first_name = data.get("first_name", mentor.first_name)
        mentor.last_name = data.get("last_name", mentor.last_name)
        mentor.gender = data.get("gender", mentor.gender)
        mentor.email = data.get("email", mentor.email)
        mentor.expertise = data.get("expertise", mentor.expertise)
        

        db.session.commit()
        return jsonify({"message": "mentor updated successfully"}), 200
    except Exception as error:
        print(error)
        return jsonify({"message": " an error occured"}), 500


@mentors.route("/delete_mentor/<int:id>", methods=["DELETE"])
@jwt_required()
def delete_mentor(id):
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


@mentors.route("/all_mentors", methods=['GET'])
#@jwt_required
def get_mentors():
    '''function to get all mentors in the database'''
    all_mentors = Mentor.query.all()
    result = mentors_schema.dump(all_mentors)
    return jsonify(result)
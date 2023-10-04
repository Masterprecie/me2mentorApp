'''
    mentor imports
'''
from flask import Blueprint, jsonify, request, redirect, session, url_for
from api import db
from api.main import user_present
from api.models import Mentor
from api.schemas import mentor_schema, mentors_schema
from flask_jwt_extended import jwt_required, create_access_token, get_jwt
from passlib.hash import bcrypt_sha256



mentors = Blueprint('mentors', __name__)

@mentors.route("/<int:id>", methods=["GET"])
def single_mentor():
    '''
        method to get a single mentor
    '''
    mentor = Mentor.query.get(id)
    return mentor_schema.jsonify(mentor)


@mentors.route("/mentor_register", methods=["POST"])
def mentor_register():
    '''
        a register function for the mentor route
    '''

    try:
        data = request.get_json()
        first_name = data['first_name']
        last_name = data['last_name']
        age = data['age']
        gender = data['gender']
        email = data['email']
        plain_password = data['password']
        username = data['username']
        expertise = data['expertise']
        experience = data['experience']
        
        hashed_password = bcrypt_sha256.hash(plain_password)

        if not user_present(email):
            mentor = Mentor(
                    first_name=first_name,
                    last_name=last_name,
                    email=email,
                    age=age,
                    gender=gender,
                    username=username,
                    password=hashed_password,
                    expertise=expertise,
                    experience=experience
                    )

            db.session.add(mentor)
            db.session.commit()
            return jsonify({'status' : 'Mentor added successfully'}), 200

        return jsonify({'message': 'mentor already exists'})
    except Exception as error:
        return jsonify({"error": str(error)})

@mentors.route('/login', methods=['POST'])
def mentor_login():
    '''
        mentor login route
    '''
    try:
        data = request.get_json()
        username = data['username']
        plain_password = data['password']

        mentor = Mentor.query.filter_by(username=username).first()

        if mentor and bcrypt_sha256.verify(plain_password, mentor.password):
            access_token = create_access_token(identity=mentor.id)
            return jsonify({'username': mentor.username, 'access_token': access_token}), 200
        else:
            return jsonify({'message': 'Invalid credentials'}), 401

    except Exception as error:
        return jsonify({"error": str(error)}), 400


@mentors.route("/update_mentor/<int:id>", methods=["PUT"])
@jwt_required()
def update_mentor():
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


@mentors.route("/all_mentors", methods=['GET'])
def get_mentors():
    '''function to get all mentors in the database'''
    all_mentors = Mentor.query.all()
    result = mentors_schema.dump(all_mentors)
    return jsonify(result)

@mentors.route('/logout', methods=['GET'])
@jwt_required()
def mentee_logout():
    '''
        mentor logout route
    '''
    try:
        session.clear()
        return redirect(url_for('mentor_login'))

    except Exception as error:
        return str(error), 400

'''
    mentee - mentor imports
'''
from flask import Blueprint, jsonify, request, redirect, session, url_for
from api import db
from api.main import user_present
from api.models import Mentee
from api.schemas import mentee_schema, mentees_schema
from passlib.hash import bcrypt_sha256
from flask_jwt_extended import jwt_required


mentees = Blueprint('mentees', __name__)


@mentees.route("/mentee_register", methods=["POST"])
def mentee_register():
    '''
        a register function for the mentee route
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
        interests = data['interests']
        
        hashed_password = bcrypt_sha256.hash(plain_password)

        if not user_present(email):
            mentee = Mentee(
                    first_name=first_name,
                    last_name=last_name,
                    email=email,
                    age=age,
                    gender=gender,
                    username=username,
                    password=hashed_password,
                    interests=interests
                    )

            db.session.add(mentee)
            db.session.commit()
            return jsonify({'status' : 'Mentee added successfully'}), 200

        return jsonify({'message': 'mentee already exists'})
    except Exception as error:
        return jsonify({"error": str(error)})


@mentees.route('/login', methods=['POST'])
def mentee_login():
    '''
        mentee login route
    '''
    try:
        data = request.get_json()
        email = data['email']
        plain_password = data['password']

        mentee = Mentee.query.filter_by(email=email).first()

        if mentee and bcrypt_sha256.verify(plain_password, mentee.password):
            return jsonify({'message': 'Login Successful'}), 200
        else:
            return jsonify({'message': 'Login failed'}), 401
    
    except Exception as error:
        return jsonify({"error": str(error)}), 400


@mentees.route('/<int:id>', methods=['GET'])
@jwt_required()
def single_mentee(id):
    '''
        method to get a single mentee
    '''
    mentee = Mentee.query.get(id)
    return mentee_schema.jsonify(mentee)


@mentees.route("/all_mentees", methods=['GET'])
def get_mentees():
    '''
        function to get all mentees in the database
    '''
    all_mentees = Mentee.query.all()
    result = mentees_schema.dump(all_mentees)
    return jsonify(result)


@mentees.route("/updateMentee/<int:id>", methods=["PUT"])
@jwt_required()
def update_mentee():
    '''
        Updates the mentee details
    '''
    mentee = Mentee.query.get(id)
    if not mentee:
        return jsonify({'msg': 'User does not exist'})
    try:
        data = request.get_json()        
        mentee.email = data.get('email', mentee.email)

        mentee.first_name = data.get('first_name', mentee.first_name)
        mentee.last_name = data.get('last_name', mentee.last_name)
        mentee.age = data.get('age', mentee.age)
        mentee.username = data.get('username', mentee.username)
        mentee.interests = data.get('interests', mentee.interests)

        db.session.commit()
        return jsonify({'status' : 'mentee successfully updated'}), 200
    except Exception as error:
        print(error)
        return jsonify({'error': 'An error occurred'}), 500

@mentees.route('/logout', methods=['GET'])
def mentee_logout():
    '''
        mentee logout route
    '''
    try:
        
        session.clear()
        return redirect(url_for('mentee_login'))

    except Exception as error:
        return str(error), 400
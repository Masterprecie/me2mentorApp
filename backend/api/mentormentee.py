'''
    mentee - mentor imports
'''
from api import db, bcrypt
from flask import Blueprint, jsonify, request
from api.main import user_present
from api.models import Mentor, Mentee
from api.schemas import mentee_schema, mentees_schema, mentor_schema, mentors_schema
from flask_jwt_extended import jwt_required

blp_users = Blueprint('users', __name__)


@blp_users.route("/mentee_register", methods=["POST"])
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
        password = data['hashed_password']
        username = data['username']
        interests = data['interests']
        
        
        if not user_present(email):
            hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
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


@blp_users.route('/mentee/<int:mentee_id>', methods=['GET'])
@jwt_required()
def single_mentee(id):
    '''
        method to get a single mentee
    '''
    single_mentee = Mentee.query.get(id)
    return mentee_schema.jsonify(single_mentee)


@blp_users.route("/all_mentees", methods=['GET'])
def get_mentees():
    '''function to get all mentees in the database'''
    all_mentees = Mentee.query.all()
    result = mentees_schema.dump(all_mentees)
    return jsonify(result)


@blp_users.route("/updateMentee/<int:id>", methods=["PUT"])
@jwt_required()
def update_mentee():
    """
    Updates the mentee details
    """
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


@blp_users.route("/getMentors/<int:id>", methods=["GET"])
@jwt_required()
def single_mentor(id):
    '''
        method to get a single mentee
    '''
    single_mentor = Mentor.query.get(id)
    return mentor_schema.jsonify(single_mentor)


@blp_users.route("/mentor_register", methods=["POST"])
@jwt_required()
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
    password = data.get("hashed_password")
    expertise = data.get("expertise")
    
    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

    new_mentor = Mentor(
            first_name=first_name,
            last_name=last_name,
            age=age,
            email=email,
            username=username,
            gender=gender, 
            expertise=expertise, 
            password=hashed_password
            )

    try:
        db.session.add(new_mentor)
        db.session.commit()
        return jsonify({"message": "Mentor joined successfully"}), 201
    except Exception as error:
        print(str(error))
        return jsonify({"message": "Failed to add mentor"}), 500


@blp_users.route("/update_mentor/<int:id>", methods=["PUT"])
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


@blp_users.route("/delete_mentor/<int:id>", methods=["DELETE"])
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


@blp_users.route("/all_mentors", methods=['GET'])
@jwt_required
def get_mentors():
    '''function to get all mentors in the database'''
    all_mentors = Mentor.query.all()
    result = mentors_schema.dump(all_mentors)
    return jsonify(result)
""" package imports"""

from datetime import datetime
from itsdangerous import TimedJSONWebSignatureSerializer as Serializer
from flask import current_app
from mentorapp import db, login_manager


# login required check for mentors
@login_manager.user_loader
def load_user(mentor_id):
    """
        function to load the user
    """
    return Mentor.query.get(int(mentor_id))


class Mentor(db.Model):
    """
        Mentor class with full descriptions
    """
    __tablename__ = 'mentors'
    mentor_id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(20), nullable=False)
    last_name = db.Column(db.String(20), nullable=False)
    age = db.Column(db.Integer, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    username = db.Column(db.String(20), unique=True, nullable=False)
    password = db.Column(db.String(60), nullable=False)
    profile_picture = db.Column(db.String(255), nullable=False, default='default.jpg')
    expertise = db.Column(db.String(120), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    mentees = db.relationship('Mentee', backref='mentor', lazy=True)


    def get_reset_token(self, expires_sec=600):
        """
            function to get the reset token
        """
        s = Serializer(current_app.config['SECRET_KEY'], expires_sec)
        return s.dumps({'mentor_id': self.mentor_id}).decode('utf-8')

    @staticmethod
    def verify_reset_token(token):
        """
            method to verify the mail reset token
        """
        s = Serializer(current_app.config['SECRET_KEY'])
        try:
            mentor_id = s.loads(token)['mentor_id']
        except:
            return None
        return Mentor.query.get(mentor_id)

    def __repr__(self):
        return f"User('{self.username}', '{self.email}', '{self.full_name}', '{self.bio}', '{self.avatar}')"

    def get_id(self):
        """
            funtion to retrieve the class id
        """
        return str(self.mentor_id)

# login required check for mentees
@login_manager.user_loader
def load_user(mentee_id):
    """
        function to load the user
    """
    return Mentee.query.get(int(mentee_id))


class Mentee(db.Model):
    """
        Mentee class with full descriptions
    """
    __tablename__ = 'mentees'
    mentee_id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(20), nullable=False)
    last_name = db.Column(db.String(20), nullable=False)
    age = db.Column(db.Integer, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    username = db.Column(db.String(20), unique=True, nullable=False)
    password = db.Column(db.String(60), nullable=False)
    profile_picture = db.Column(db.String(255), nullable=False, default='default.jpg')
    interests = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    mentor_id = db.Column(db.Integer, db.ForeignKey('mentors.mentor_id'), nullable=True)


    def get_reset_token(self, expires_sec=600):
        """
            function to get the reset token
        """
        s = Serializer(current_app.config['SECRET_KEY'], expires_sec)
        return s.dumps({'mentee_id': self.mentee_id}).decode('utf-8')

    @staticmethod
    def verify_reset_token(token):
        """
            method to verify the mail reset token
        """
        s = Serializer(current_app.config['SECRET_KEY'])
        try:
            mentee_id = s.loads(token)['mentee_id']
        except:
            return None
        return Mentee.query.get(mentee_id)

    def __repr__(self):
        return f"User('{self.username}', '{self.email}', '{self.full_name}', '{self.bio}', '{self.avatar}')"

    def get_id(self):
        """
            funtion to retrieve the class id
        """
        return str(self.mentee_id)



class MenteeMentor(db.Model):
    """
        Mentee - Mentor relationship class
    """
    __tablename__ = 'mentee_mentor'
    mentee_mentor_id = db.Column(db.Integer, primary_key=True)
    mentee_id = db.Column(db.Integer, db.ForeignKey('mentees.mentee_id'))
    mentor_id = db.Column(db.Integer, db.ForeignKey('mentors.mentor_id'))

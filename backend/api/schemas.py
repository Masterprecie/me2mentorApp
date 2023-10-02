'''
    relevant imports
'''
from marshmallow import fields, post_load
from api import ma
from api.models import Mentee, Mentor


class MenteeSchema(ma.SQLAlchemyAutoSchema):
    '''
        mentee model schema
    '''
    mentee_id = fields.Int()
    first_name = fields.Str()
    last_name = fields.Str()
    age = fields.Int()
    email = fields.Email()
    password = fields.Str(required=True, load_only=True)
    username = fields.Str()
    profile_picture = fields.Str()
    interests = fields.Str()
    password_hash = fields.Str()

    @post_load
    def make_mentee(self, data, **kwargs):
        '''
            schema function to create mentee
        '''
        return Mentee(**data)

mentee_schema = MenteeSchema()
mentees_schema = MenteeSchema(many=True)



class MentorSchema(ma.SQLAlchemyAutoSchema):
    '''
        mentor model schema
    '''
    mentor_id = fields.Int(dump_only=True)
    first_name = fields.Str()
    last_name = fields.Str()
    age = fields.Int()
    username = fields.Str()
    email = fields.Email()
    password = fields.Str(required=True, load_only=True)
    profile_picture = fields.Str()
    expertise = fields.Str()

    @post_load
    def make_mentor(self, data, **kwargs):
        '''
            schema function to create mentee
        '''
        return Mentor(**data)

mentor_schema = MentorSchema()
mentors_schema = MentorSchema(many=True)


class MentorUserSchema(ma.SQLAlchemyAutoSchema):
    '''
        Mentee user schema
    '''
    id = fields.Int(dump_only=True)
    username = fields.Str(required=True)
    password = fields.Str(required=True, load_only=True)
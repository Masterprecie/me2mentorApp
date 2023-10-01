'''
    Module providing use of environment variables
'''
import os


class Config:
    '''
        configuration class for different environment instances 
    '''
    SECRET_KEY = os.environ.get('SECRET_KEY')
    SQLALCHEMY_DATABASE_URI = os.environ.get('SQLALCHEMY_DATABASE_URI')

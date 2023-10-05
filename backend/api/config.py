'''
    Module providing use of environment variables
'''
import os
basedir = os.path.abspath(os.path.dirname(__file__))


class Config:
    '''
        configuration class for different environment instances 
    '''
    SECRET_KEY = os.environ.get('SECRET_KEY')
    SQLALCHEMY_DATABASE_URI = os.environ.get('SQLALCHEMY_DATABASE_URI') or \
            'sqlite:///' + os.path.join(basedir, 'menteementor.sqlite')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY = "IMADE"

    
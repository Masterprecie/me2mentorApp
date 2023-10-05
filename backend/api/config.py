'''
    Module providing use of environment variables
'''
import os
basedir = os.path.abspath(os.path.dirname(__file__))


class Config:
    '''
        configuration class for different environment instances 
    '''
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'imadesecretkey'
    SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.join(basedir, 'mentee_mentor.sqlite')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY = "IMADE"
    UPLOAD_FOLDER = '\Users\Imade\Documents\Python\projects\me2mentorApp\backend\images'

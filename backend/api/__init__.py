""" installed package imports """
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from config import Config



# Configurations #

db = SQLAlchemy()
ma = Marshmallow()
bcrypt = Bcrypt()
cors = CORS()
jwt = JWTManager()



def create_app(config_class=Config):
    '''
        function to run the app
    '''
    app = Flask(__name__)
    app.config.from_object(Config)

    db.init_app(app)
    bcrypt.init_app(app)
    cors.init_app(app)
    jwt.init_app(app)

    # circular import prevention #
    from api.main import main
    from api.mentee import mentees
    from api.mentor import mentors

    # Flask blueprint register
    app.register_blueprint(main, url_prefix='/api/main')
    app.register_blueprint(mentees, url_prefix='/api/mentees')
    app.register_blueprint(mentors, url_prefix='/api/mentors')

    return app

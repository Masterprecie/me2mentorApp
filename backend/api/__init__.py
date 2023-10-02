""" installed package imports """
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from config import Config



# Configurations #

db = SQLAlchemy()
ma = Marshmallow()
bcrypt = Bcrypt()
cors = CORS()


def create_app(config_class=Config):
    '''
        function to run the app
    '''
    app = Flask(__name__)
    app.config.from_object(Config)

    db.init_app(app)
    bcrypt.init_app(app)
    cors.init_app(app)

    # circular import prevention #
    from api.main import main
    from api.mentormentee import blp_users

    # Flask blueprint register
    app.register_blueprint(main, url_prefix='/api/main')
    app.register_blueprint(blp_users, url_prefix='/api/blp_users')

    return app

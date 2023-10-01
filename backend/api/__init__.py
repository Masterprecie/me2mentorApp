""" installed package imports """
from flask import Flask
from flask_cors import CORS, cross_origin
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_bcrypt import Bcrypt
from flask_mail import Mail
from mentorapp.config import Config



# Configurations #

db = SQLAlchemy()
ma = Marshmallow()
bcrypt = Bcrypt()

mail = Mail()


def create_app(config_class=Config):
    '''
        function to run the app
    '''
    app = Flask(__name__)
    app.config.from_object(Config)
    cors = CORS(app)
    cors = CORS(app, resources={r"/*": {"origins": "*"}})


    db.init_app(app)
    bcrypt.init_app(app)
    mail.init_app(app)

    # circular import prevention #
    from mentorapp.api.routes import api

    # Flask blueprint register
    app.register_blueprint(api)

    return app

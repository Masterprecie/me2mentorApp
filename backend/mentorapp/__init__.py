""" installed package imports """
from flask import Flask
from flask_cors import CORS, cross_origin
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_bcrypt import Bcrypt
from flask_login import LoginManager
from flask_mail import Mail
from mentorapp.config import Config



# Configurations #

db = SQLAlchemy()
ma = Marshmallow()
bcrypt = Bcrypt()
login_manager = LoginManager()
login_manager.login_view = 'mentees.login'
login_manager.login_message_category = 'info'

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
    login_manager.init_app(app)
    mail.init_app(app)

    # circular import prevention #
    from mentorapp.route.routes import api

    # Flask blueprint register
    app.register_blueprint(api)

    return app

'''
  jwt authentication file
'''

from flask import jsonify
from api import jwt

@jwt.expired_token_loader
def expired_token_callback(jwt_header, jwt_payload):
    '''
      jwt expired token callback
    '''
    return (
        jsonify({"message": "The token has expired.", "error": "token_expired"}),
        401,
    )

@jwt.invalid_token_loader
def invalid_token_callback(error):
    '''
      jwt invalid token callback
    '''
    return (
        jsonify(
            {"message": "Signature verification failed.", "error": "invalid_token"}
        ),
        401,
    )

@jwt.unauthorized_loader
def missing_token_callback(error):
    '''
      jwt missing token callback
    '''
    return (
        jsonify(
            {
                "description": "Request does not contain an access token.",
                "error": "authorization_required",
            }
        ),
        401,
    )
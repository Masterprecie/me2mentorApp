'''
    jwt authentication file
'''

from flask import jsonify
from api import jwt
from api.blocklist import BLOCKLIST


@jwt.token_in_blocklist_loader
def check_if_token_in_blocklist(jwt_header, jwt_payload):
    '''
        checks if the jwt token is in the blocklist
    '''
    return jwt_payload["jti"] in BLOCKLIST


@jwt.revoked_token_loader
def revoked_token_callback(jwt_header, jwt_payload):
    '''
        checked and returns when the token has been revoked
    '''
    return (
        jsonify(
            {"description": "The token has been revoked.", "error": "token_revoked"}
        ),
        401,
    )


@jwt.additional_claims_loader
def add_claims_to_jwt(identity):
    '''
        autorization and claims jwt function
    '''
    if identity == 1:
        return {"is_admin": True}
    return {"is_admin": False}


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
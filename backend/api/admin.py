'''
  admin imports
'''

from flask import Blueprint, jsonify, request, redirect, session, url_for
from api import db
from api.main import user_present
from api.models import Mentor, Mentee
from api.schemas import mentor_schema, mentors_schema, mentee_schema, mentees_schema


admin = Blueprint('admins', __name__)

@admin.route('/dashboard', methods=['GET', 'POST'])

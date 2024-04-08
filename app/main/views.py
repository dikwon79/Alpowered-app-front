from flask import render_template
from flask_login import current_user
from .. import db
from . import main
from ..models import APILog,User
from sqlalchemy.sql import func
from flask import request
from collections import defaultdict


@main.route('/')
def index():
    if current_user.is_authenticated:
        return render_template('main.html')
    else:
        return render_template('index.html')

@main.route('/admin')
def admin():
   
    return render_template('admin.html')
  
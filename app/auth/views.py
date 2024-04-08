from flask import render_template, flash, redirect, url_for, session
from flask_login import login_user, logout_user, login_required, current_user
from flask.globals import request
from .. import db, mail
from . import auth
from .forms import SignupForm, LoginForm, Forgetpassword
from ..models import User
from sqlalchemy import exc
from flask_mail import Message

@auth.route('/signup/', methods=['GET', 'POST'])
def signup():
    form = SignupForm()     
    return render_template('auth/signup.html', form=form)

@auth.route('/forgetpassword/', methods=['GET', 'POST'])
def forgetpassword():
    form = Forgetpassword()
    return render_template('auth/forget_password.html', form=form)


@auth.route('/login', methods=['GET', 'POST'])
def login():
    
    if current_user.is_authenticated:
        if current_user.username == 'admin':
            return redirect(url_for('main.admin'))
        else:
            return redirect(url_for('main.index'))
    
    form = LoginForm() 
    
    return render_template('auth/login.html', form=form)

@auth.route('/logout')
@login_required
def logout():
    logout_user()
    flash('logout completed.')
    return redirect(url_for('main.index'))  

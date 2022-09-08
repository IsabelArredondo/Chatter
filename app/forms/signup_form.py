from email import message
from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError, Length
from app.models import User
import email_validator

def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')


class SignUpForm(FlaskForm):
    username = StringField(
        'username', validators=[DataRequired(message="Please Provide User Name"), Length(min=1, max=15, message="Username should be between 1 and 15 characters"), username_exists])
    email = StringField('email', validators=[DataRequired(message="Please Provide Email"), Email(), user_exists])
    password = StringField('password', validators=[DataRequired(message="Please Provide Password"), Length(min=5, max=15, message="Password should be between 5 and 15 characters")])
    profileImage = StringField('profileImage')

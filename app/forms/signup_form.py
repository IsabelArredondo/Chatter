from email import message
from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError, Regexp
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
        'username', validators=[DataRequired(message="Please Provide User Name"), username_exists])
    email = StringField('email', validators=[DataRequired(message="Please Provide Email"), Email(), user_exists])
    password = StringField('password', validators=[DataRequired(message="Please Provide Password")])
    profileImage = StringField('profileImage', validators=[ Regexp('(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)', flags=0, message='Image must start with https and end with .png/.jpeg/.gif/.jpg')])

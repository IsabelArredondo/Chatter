from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField, SubmitField, TextAreaField
from wtforms.validators import DataRequired


class CommentForm(FlaskForm):

    description = TextAreaField("Description", validators=[DataRequired(message="Description is required")])
    comment_img = StringField('comment_img')
    
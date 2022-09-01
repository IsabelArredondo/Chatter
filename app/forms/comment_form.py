from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField
from wtforms.validators import DataRequired


class CommentForm(FlaskForm):

    description = TextAreaField("Description", validators=[DataRequired(message="Description is required")])
    comment_img = StringField('comment_img')
    
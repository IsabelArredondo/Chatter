from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField
from wtforms.validators import DataRequired

class PostForm(FlaskForm):
    description = TextAreaField('description',validators=[DataRequired(message="Description is required")])
    img = StringField('img')
    
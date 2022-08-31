from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired

class PostForm(FlaskForm):
    description = StringField('description',validators=[DataRequired(message="Description is required")])
    img = StringField('img')
    
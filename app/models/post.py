from .db import db

class Post(db.Model):
    __tablename__ = 'posts'

    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.Text(280))
    img = db.Column(db.String(1000))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    user = db.relationship('User', back_populates='posts')
    comments = db.relationship('Comment', back_populates='post',cascade='all, delete')


    def to_dict(self):
        return {
            'id': self.id,
            'description': self.description,
            'img': self.img,
            'user':self.user.to_dict(),
        }
from urllib import response
from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import Post, db 
from app.forms.post_form import PostForm


post_routes = Blueprint('posts', __name__)
# posts = Post.query.order_by((Post.id)).all()

# '/posts/all'
#get all posts 
@post_routes.route('/all')
@login_required
def posts():
    posts = Post.query.all()
    response = [post.to_dict() for post in posts]
    return {'posts': response}


# '/posts/user'
#get current users posts 
@post_routes.route('/user')
@login_required
def user_posts():
    posts = Post.query.filter(Post.user_id == current_user.get_id()).all()
    response = [post.to_dict() for post in posts]
    return {'posts': response}


# '/posts/<int:userId>''
#get post by user id 
@post_routes.route('/<int:userId>')
@login_required
def post_by_user_id(userId):
    posts = Post.query.filter(Post.user_id == userId).all()
    response = [post.to_dict() for post in posts]
    return {'posts': response}



# '/posts/post'
# post a thought 
@post_routes.route('/post', methods=['POST'])
@login_required
def create_post():
    form = PostForm()


    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        post = Post(
            description=form.data['description'],
            img=form.data['img'],
            user=current_user
        )
        db.session.add(post)
        db.session.commit()
        response = post.to_dict()

        return response

    return {'errors': form.errors}, 401



# '/posts/post/<int:id>'
# edit a post 
@post_routes.route('/post/<int:id>', methods=['PUT'])
@login_required
def edit_post(id):
    post = Post.query.get(id)


    form = PostForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        post.description=form.data['description']
        post.img=form.data['img']


        db.session.commit()
        
        allposts = Post.query.all()
        response = [post.to_dict() for post in allposts]
        return {'posts': response}

    return {'errors': form.errors}, 401



# '/posts/post/<int:id>'
# delete post by post id 
@post_routes.route('/post/<int:id>', methods=['DELETE'])
@login_required
def delete_post(id):
    post = Post.query.get(id)

    db.session.delete(post)
    db.session.commit()

    allposts = Post.query.all()
    response = [post.to_dict() for post in allposts]
    return {'posts': response}
from flask import Blueprint, request
from app.models import Post ,Comment, db
from app.forms.comment_form import CommentForm
from flask_login import current_user, login_required

comment_routes = Blueprint('comments', __name__, "")

# '/comments/all'
# get all comments DONE
@comment_routes.route("/all")
def get_all_post():
    comments = Comment.query.all()
    
    response = [comment.to_dict() for comment in comments ]
    return {'comment': response}


# '/comments/posts/<int:post_id>'
# get all comments by post id  DONE
@comment_routes.route('/posts/<int:post_id>')
def one_comment(post_id):
    comments = Comment.query.filter(Comment.post_id == post_id).all()
    response = [comment.to_dict() for comment in comments ]
    return {'comment': response}


# '/comments/<int:id>'
# delete comment by id DONE 
@comment_routes.route("/<int:id>", methods=["DELETE"])
@login_required
def make_comment(id):

        comment = Comment.query.get(id)
 
        
        db.session.delete(comment)
        db.session.commit()
        
        
        return {"commentId": comment.id}  


# '/comments/post/<int:post_id1>'
# post comment by post id
@comment_routes.route("/post/<int:post_id1>", methods=["POST"])
@login_required

def post_comment(post_id1):

    post = Post.query.get(post_id1)

    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        comment1 = Comment(
            description=form.data['description'],
            comment_img=form.data['comment_img'],
            post_id=post.id,
            user_id=current_user.get_id()
        )
        
        db.session.add(comment1)
        db.session.commit()
        response = comment1.to_dict()
        print(response)
        return {'comment': response }
    print(form.errors)
    return {'errors': form.errors}, 401


# '/comments/comment/<int:id>'
#edit comment by comment id
@comment_routes.route('/comment/<int:id>', methods=['PUT'])
@login_required
def edit_post(id):
    comment = Comment.query.get(id)

    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    

    if form.validate_on_submit():
        comment.description=form.data['description']
        comment.comment_img=form.data['comment_img']


        db.session.commit()
        return comment.to_dict()

    return {'errors': form.errors}, 401
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from 'react'
import { getAllComments, commentDelete } from '../../store/comments'
import { Link } from 'react-router-dom'
import CreateComment from '../comments/CreateComment'
import EditComment from "../editComment"
import './Comments.css'

function Comments({ thought, setShowModal, id }) {

    const dispatch = useDispatch()

    const comments = useSelector((state) => (state?.comments?.comments))
    const user_id = useSelector(state => state?.session?.user?.id)
    

    

    useEffect(() => {
        (async () => {
            await dispatch(getAllComments())

        })();
    }, [dispatch]);

    const removeComment = (id) => async (e) => {

        e.preventDefault()
        dispatch(commentDelete(id))
    }


    return (
        
    <>
    <div className="overflow">
                <div className='CommentPostContainer'>
                    <div className='userInfo'>

                        <Link to={`/posts/user/${thought?.user?.id}`} key={thought?.id} >
                            {thought?.user?.profileImage ? <img className='ProfileImage' alt="Profile" src={thought?.user?.profileImage} />
                                : <i class="fa-solid fa-user-secret"></i>}
                        </Link>
                        <div className='username'> {thought?.user?.username}</div>

                    </div>


                    <div className='description'>{thought?.description}</div>
                    {thought?.img ?
                        <img className='commentfeedimage' alt="description" src={thought?.img} />
                        : null
                    }
                </div>




    <div className="createcomment">
      <CreateComment postId={id}/>

    </div>
     {comments?.map((comment) => {
     console.log('COMMENT', comment.post.id)
     return (

     <div>
      {comment?.post.id === id ?
                            

            

         <div className="Commentscontainer">
            




         <div className="userComments">
         <div className='commentuserInfo'>
         <Link to={`/posts/user/${thought?.user?.id}`} key={thought?.id} >
            {comment?.user?.profileImage ? <img className='CommentProfileImage' alt="Profile" src={comment?.user?.profileImage} />
            : <i class="fa-solid fa-user-secret"></i>}
                </Link>
                <div className="names">
                <div className='commentusername'>{comment?.user?.username}</div>
                <div className="postusername">Replying to @{thought.user.username}</div>
                </div>
                </div>

          <div className="commentdescription">
           {comment?.description}
            </div>
            {comment?.img ?
           <img className='feedimage' alt="description" src={comment?.img} />
            : null}
             
             {comment?.user.id === user_id && comment?.post?.id === id ?
                 <div>
                <button className="commentdelete" onClick={removeComment(comment?.id)}><i className="fa-solid fa-trash deletePenIcon fa-xl"></i></button>

                <EditComment comment={comment} id={comment?.id} />

                </div>
               : null
            }
          </div>




             </div>
            : null}
             </div>
             )
            })}

</div>

        </>

    )


}

export default Comments


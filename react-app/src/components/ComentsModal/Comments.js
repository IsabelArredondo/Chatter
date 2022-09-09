import { useDispatch, useSelector } from "react-redux"
import { useEffect} from 'react'
import { getAllComments, commentDelete } from '../../store/comments'
import { Link } from 'react-router-dom'
import CreateComment from '../comments/CreateComment'
// import EditComment from "../editComment"
import EditIndex from "../editindex"
import './Comments.css'

function Comments({ thought, setShowModal, id }) {

    const dispatch = useDispatch()

    const comments = useSelector((state) => (state?.comments?.comments))
    const user_id = useSelector(state => state?.session?.user?.id)
    // NEW



    useEffect(() => {
        (async () => {
            await dispatch(getAllComments())

        })();
    }, [dispatch]);

    const removeComment = (id) => async (e) => {

        e.preventDefault()
        dispatch(commentDelete(id))
    }

   
console.log('Comment section',thought.img)


    return (
        
    <>
    <div className="overflow">
                <div className='CommentPostContainer'>
                    <div className='userInfo'>

                        <Link to={`/posts/user/${thought?.user?.id}`} key={thought?.id} >
                            {thought?.user?.profileImage ? <img className='xxmainpost' alt="Profile" onError={({target}) => {
                                         target.onError = null;
                                         target.src = 'https://media.istockphoto.com/vectors/invalid-stamp-invalid-label-round-grunge-sign-vector-id1289670343?k=20&m=1289670343&s=612x612&w=0&h=Cck0Yb0f20XFUAZpkgXhoyllgr-EdMMkQWBBiCdq3Hs=';
                                    }} 
                            
                            src={thought?.user?.profileImage} />
                                : <i className="fa-solid fa-user-secret commentdefaultuser "></i>}
                        </Link>
                        <div className='username'> {thought?.user?.username}</div>

                    </div>


                    <div className='description'>{thought?.description}</div>
                    {thought?.img ?
                    
                        <img className='commentfeedimage' alt="description" onError={({target}) => {
                            target.onError = null;
                            target.src = 'https://media.istockphoto.com/vectors/invalid-stamp-invalid-label-round-grunge-sign-vector-id1289670343?k=20&m=1289670343&s=612x612&w=0&h=Cck0Yb0f20XFUAZpkgXhoyllgr-EdMMkQWBBiCdq3Hs=';
                       }} 
                        
                        src={thought?.img} />
                        : null
                    }
                </div>




    <div className="createcomment">
      <CreateComment postId={id}/>

    </div>
     {comments?.map((comment) => {
     
     return (

     <div>
      {comment?.post.id === id ?
                            

            

         <div className="Commentscontainer">
            




         <div className="userComments">
         <div className='commentuserInfo'>
         <Link to={`/posts/user/${user_id}`} key={thought?.id} >
            {comment?.user?.profileImage ? <img className='CommentProfileImage' alt="Profile" onError={({target}) => {
                                         target.onError = null;
                                         target.src = 'https://media.istockphoto.com/vectors/invalid-stamp-invalid-label-round-grunge-sign-vector-id1289670343?k=20&m=1289670343&s=612x612&w=0&h=Cck0Yb0f20XFUAZpkgXhoyllgr-EdMMkQWBBiCdq3Hs=';
                                    }} 
            src={comment?.user?.profileImage} />
            : <i class="fa-solid fa-user-secret homefeeddefaultuser"></i>}
                </Link>
                <div className="names">
                <div className='commentusername'>{comment?.user?.username}</div>
                <div className="postusername">Replying to @{thought.user.username}</div>
                </div>
                </div>

          <div className="wkcahdu">
           {comment?.description}
            </div>

            {comment?.comment_img ?
           <img className='feedcommentimage' alt="description" onError={({target}) => {
            target.onError = null;
            target.src = 'https://media.istockphoto.com/vectors/invalid-stamp-invalid-label-round-grunge-sign-vector-id1289670343?k=20&m=1289670343&s=612x612&w=0&h=Cck0Yb0f20XFUAZpkgXhoyllgr-EdMMkQWBBiCdq3Hs=';
            }} 
           
           src={comment?.comment_img} />
            : null}
             
             {comment?.user.id === user_id && comment?.post?.id === id ?
                 <span>

                <button className="deleteIconBtn" onClick={removeComment(comment?.id)}><i className="fa-solid fa-trash deleteIconBtn fa-xl"></i></button>
             
                
                {/* <EditComment comment={comment} id={comment?.id} /> */}
                <EditIndex comment={comment} id={comment?.id} />
                </span>
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


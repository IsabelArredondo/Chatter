import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {createComments} from '../../store/comments'
import './CreateComment.css'


const CreateComment = ({postId}) => {
    
    const dispatch = useDispatch()
    const [description, setDescription] = useState('');
    const [comment_img, setComment_img] = useState('');
    const [errors, setErrors] = useState([]);



    
    const user = useSelector(state => state?.session?.user)
    

    const handleSubmit = async (e) => {
        e.preventDefault()
        let validateErrors = [];
        
        
        let errorimage = /^http[^ \!@\$\^&\(\)\+\=]+(\.png|\.jpeg|\.gif|\.jpg)$/;

        if (description?.length > 200) validateErrors.push('Comment cannot be longer than 200 characters');
        if (!description) validateErrors.push('Comment cannot be empty');
        if(description.startsWith(' ')) validateErrors.push('Thought cannot start with empty space');
        if (comment_img && !comment_img.match(errorimage)) validateErrors.push('Image must start with https and end with .png/.jpeg/.gif/.jpg');
  

        if (validateErrors.length > 0) {
            setErrors(validateErrors);
            return;
        }


 

        const data = {

            description,
            comment_img

        };


        dispatch(createComments(data, postId))

        
          setErrors([]);
          setDescription("");
          setComment_img("")          
          
    }



    return (
        <>
        <div className='CreatePost'>

            <div className='userInfo'>
            { user?.profileImage ?
                <img className="CommentProfileImage"  alt="Profile" src={user?.profileImage} />
                :
                <i class="fa-solid fa-user-secret commentdefaultuser"></i>
            }
            <span className="createusername">{user?.username}</span>
            
            </div>

                <form onSubmit={handleSubmit} className='createPostForm' >
                
                    <div className="createPostDiv">
                        {errors.map((error, i) => (<div className="errors" key={i}>{error}</div>))}
                        <textarea

                            id="CommentInput"
                            type="text"
                            placeholder="Comment your reply"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            
                        />
                     </div>
                     
                     <span className="border">
                        
                        <input

                        id="imageInput"
                        type="text"
                        // pattern="(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)"
                        placeholder="Want to add an image?"
                        value={comment_img}
                        onChange={(e) => setComment_img(e.target.value)}
                        />
                   
                    <button className='CommentButton' type="submit" >Post</button>
                 </span>
                </form>
             </div>    

        </>
    )
}

export default CreateComment

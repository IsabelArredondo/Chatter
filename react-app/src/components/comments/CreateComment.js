import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {createComments} from '../../store/comments'
import './CreateComment.css'


const CreateComment = ({postId}) => {
    console.log("ID", postId)
    const dispatch = useDispatch()
    const [description, setDescription] = useState('');
    const [img, setImg] = useState('');
    const [errors, setErrors] = useState([]);



    
    const user = useSelector(state => state?.session?.user)
    

    const handleSubmit = async (e) => {
        e.preventDefault()
        let validateErrors = [];
        
        if (description?.length > 200) validateErrors.push('Thought cannot be longer than 200 characters');
        if (!description) validateErrors.push('Description cannot be empty');
  

        if (validateErrors.length > 0) {
            setErrors(validateErrors);
            return;
        }


 

        const data = {

            description,
            img

        };


        dispatch(createComments(data, postId))

        
          setErrors([]);
          setDescription("");
          setImg("")          
          
    }



    return (
        <>
        <div className='CreatePost'>

            <div className='userInfo'>
            { user?.profileImage ?
                <img className="CommentProfileImage"  alt="Profile" src={user?.profileImage} />
                :
                <i class="fa-solid fa-user-secret defaultuser"></i>
            }
            <span className="createusername">{user?.username}</span>
            
            </div>

                <form onSubmit={handleSubmit} className='createPostForm' >
                
                    <div className="createPostDiv">
                        {errors.map((error, i) => (<div className="errors" key={i}>{error}</div>))}
                        <textarea

                            id="CommentInput"
                            type="text"
                            placeholder="Chat your reply"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            
                        />
                     </div>
                     
                     <div className="border">
                        
                        <input

                        id="imageInput"
                        type="url"
                        pattern="(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)"
                        placeholder="Want to add an image?"
                        value={img}
                        onChange={(e) => setImg(e.target.value)}
                        />
                   
                    <button className='CommentButton' type="submit" >Post</button>
                 </div>
                </form>
             </div>    

        </>
    )
}

export default CreateComment

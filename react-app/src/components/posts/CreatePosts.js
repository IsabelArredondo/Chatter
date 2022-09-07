import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from 'react-router-dom'
import {createThought} from '../../store/thoughts'
import './CreatePost.css'


const CreatePosts = () => {

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
        // if (!img.includes('https://')) validateErrors.push('Must be a Url')
        // if (!img.includes('jpg')) validateErrors.push('Url must end in jpg, gif, or png')
        // if (!img.includes('gif')) validateErrors.push('Url must end in jpg, gif, or png')
        // if (!img.includes('png')) validateErrors.push('Url must end in jpg, gif, or png')

        if (validateErrors.length > 0) {
            setErrors(validateErrors);
            return;
        }


 

        const data = {

            description,
            img

        };


        dispatch(createThought(data))

        
          setErrors([]);
          setDescription("");
          setImg("")          
          
    }



    return (
        <>
        <div className='CreatePost'>

            {/* <div className='userInfo'> */}

            {/* </div> */}

                <form onSubmit={handleSubmit} className='createPostForm' >
                    <span className="createcontainer">
            <Link to={`/posts/user/${user?.id}`} key={user?.id} >
            { user?.profileImage ?
            
                <img className='CreateProfileImage' alt="Profile" src={user?.profileImage} />
                :
                <i class="fa-solid fa-user-secret defaultuser"></i>
            }
            </Link>

                
                    
                        {errors?.map((error, i) => (<div className="errors" key={i}>{error}</div>))}
                       
                        <textarea

                            id="createPostInput"
                            type="text"
                            placeholder="Whats happening?"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            
                        />
                    
                     </span>
                     <div className="border">
                        
                        <input

                        id="createimageInput"
                        type="url"
                        pattern="(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)"
                        placeholder="Want to add an image?"
                        value={img}
                        onChange={(e) => setImg(e.target.value)}
                        />
                   
                    <button className='PostButton' type="submit" >Post</button>
                 </div>
                </form>
             </div>    

        </>
    )
}

export default CreatePosts

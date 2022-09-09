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
        let errorimage = /^http[^ \!@\$\^&\(\)\+\=]+(\.png|\.jpeg|\.gif|\.jpg)$/;

        if (description?.length > 200) validateErrors.push('Thought cannot be longer than 200 characters');
        if (!description) validateErrors.push('Thought cannot be empty');
        if(description.startsWith(' ')) validateErrors.push('Thought cannot start with empty space');
        if (img && !img.match(errorimage)) validateErrors.push('Image must start with https and end with .png/.jpeg/.gif/.jpg');
 

        if (validateErrors.length > 0) {
            setErrors(validateErrors);
            return;
        }


 

        const data = {

            description,
            img

        };


        dispatch(createThought(data))
        console.log(data)

        
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
            
                <img className='CreateProfileImage' alt="Profile" onError={({target}) => {
                    target.onError = null;
                    target.src = 'https://media.istockphoto.com/vectors/invalid-stamp-invalid-label-round-grunge-sign-vector-id1289670343?k=20&m=1289670343&s=612x612&w=0&h=Cck0Yb0f20XFUAZpkgXhoyllgr-EdMMkQWBBiCdq3Hs=';
               }} 
                
                src={user?.profileImage} />
                :
                <i class="fa-solid fa-user-secret defaultuser"></i>
            }
            </Link>

                
                    <div>
                        {errors?.map((error, i) => (<div className="errors" key={i}>{error}</div>))}
                       
                        <textarea

                            id="createPostInput"
                            type="text"
                            placeholder="Whats happening?"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            
                        />
                    </div>
                     </span>
                     <div className="border">
                        
                        <input

                        id="createimageInput"
                        type="text"
                    // type="url"
                    // pattern="(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)"
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

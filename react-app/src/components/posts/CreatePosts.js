import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
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
        
        if (description.length > 200) validateErrors.push('Thought cannot be longer than 200 characters');
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
        

        setDescription("");
        setImg("")

        setErrors([])
    }



    return (
        <>
        <div className='CreatePost'>

            <div className='userInfo'>
            { user?.profileImage ?
                <img className='ProfileImage' alt="Profile" src={user?.profileImage} />
                :
                <i className="fa-solid fa-user-crown defaultUserLogo default"></i>
            }
            
            </div>

                <form onSubmit={handleSubmit} className='createPostForm' >


                    {errors.map((error, i) => (<div className="errors" key={i}>{error}</div>))}
                    
                    <div className="createPostDiv">

                        <input

                            id="PostInput"
                            type="text"
                            placeholder="Whats happening?"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />

                        <input

                        id="imageInput"
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

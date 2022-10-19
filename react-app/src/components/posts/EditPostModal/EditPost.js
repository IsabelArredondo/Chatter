import { useState} from "react"
import { useDispatch, useSelector } from "react-redux"
import {editThought} from '../../../store/thoughts'
import './EditPost.css'



const EditPosts = ({ thought, setShowModal, id }) => {

    const dispatch = useDispatch()
    const [description, setDescription] = useState(thought?.description);

    const [img, setImg] = useState(thought?.img);
    const [errors, setErrors] = useState([]);



    
    const user = useSelector(state => state?.session?.user)
    

    const handleSubmit = async (e) => {
        e.preventDefault()
        let validateErrors = [];
        
        
        
        let errorimage = /^http[^ \!@\$\^&\(\)\+\=]+(\.png|\.jpeg|\.gif|\.jpg)$/;

        if (description?.length > 200) validateErrors.push('update cannot be longer than 200 characters');
        if (!description) validateErrors.push('update cannot be empty');
        if(description.startsWith(' ')) validateErrors.push('update cannot start with empty space');
        if (img && !img.match(errorimage)) validateErrors.push('Image must start with https and end with .png/.jpeg/.gif/.jpg');


        if (validateErrors.length > 0) {
            setErrors(validateErrors);
            return;
        }

        const data = {

            description,
            img

        };


        dispatch(editThought(data, id))
        
        setShowModal(false)

    

        setErrors([])
    }



    return (
        <>
        <div className='EditPost'>

            {/* <div className='editUserInfo'>
            { user?.profileImage ?
                <img  className='EditProfileImage' alt="Profile" src={user?.profileImage} />
                
                :
                <i className="fa-solid fa-user-secret edituserlogo"></i>
            }
            

            </div> */}
            <div className="header">Post Your Update</div>
                <form onSubmit={handleSubmit} className='editpostform' >


                    {errors.map((error, i) => (<div className="errors" key={i}>{error}</div>))}
                    
                    
                         Edit body:
                        <textarea

                            id="editPostInput"
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            
                        />
                         Edit Image:
                        <textarea

                        id="editimageInput"
                        type="text"
                        // pattern="(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)"
                        value={img}
                        onChange={(e) => setImg(e.target.value)}
                        />
                   
                    <button className='PostButton' type="submit" >Post</button>
                 
                </form>
             </div>    

        </>
    )
}

export default EditPosts

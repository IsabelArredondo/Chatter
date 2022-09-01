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
        
        if (description.length > 200) validateErrors.push('Thought cannot be longer than 200 characters');


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

        setDescription("");
        setImg("")

        setErrors([])
    }



    return (
        <>
        <div className='EditPost'>

            <div className='editUserInfo'>
            { user?.profileImage ?
                <img id="Edit" className='EditProfileImage' alt="Profile" src={user?.profileImage} />
                
                :
                <i className="fa-solid fa-user-crown defaultUserLogo default"></i>
            }
            <div className="header">Post Your Update</div>
            </div>
            
                <form onSubmit={handleSubmit} className='editpostform' >


                    {errors.map((error, i) => (<div className="errors" key={i}>{error}</div>))}
                    
                    

                        <input

                            id="PostInput"
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />

                        <input

                        id="imageInput"
                        type="url"
                        pattern="(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)"
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
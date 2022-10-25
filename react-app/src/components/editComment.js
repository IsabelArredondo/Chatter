import { useState} from "react"
import { useDispatch} from "react-redux"
import { editComments } from '../store/comments'
import './editComment.css'


function EditComment({ comment, setShowModal, id }) {

    const dispatch = useDispatch()
    const [description, setDescription] = useState(comment?.description);
    const [comment_img, setComment_img] = useState(comment?.comment_img);
   
    const [errors, setErrors] = useState([]);


    const handleSubmit = (e) => {
        e.preventDefault()


        let validateErrors = [];
        let errorimage = /^http[^ \!@\$\^&\(\)\+\=]+(\.png|\.jpeg|\.gif|\.jpg)$/;

        if (description?.length > 200) validateErrors.push('Thought cannot be longer than 200 characters');
        if (!description) validateErrors.push('Comment cannot be empty');
        if(description.startsWith(' ')) validateErrors.push('Comment cannot start with empty space');
        if (comment_img && !comment_img.match(errorimage)) validateErrors.push('Image must start with https and end with .png/.jpeg/.gif/.jpg');


        if (validateErrors.length > 0) {
            setErrors(validateErrors);
            return;
        }

        const data = {
            id: id,
            description: description,
            comment_img: comment_img
        }


        dispatch(editComments(data, id))
            // setShowModal(false)
            // setDescription("");
            // setcomment_img("")
    
            setErrors([])



    }

    return (
        
        <div className="editnote">


         <form onSubmit={handleSubmit} >

            {/* <h3>Edit Comment</h3> */}
             {errors.map((error, i) => (<div className="editerrors" key={i}>{error}</div>))}

            <label className='createUpdate'>

                Edit Body:
                <textarea

                    id="editcomment"
                    type="text"
                    value={description}
                    onChange={(e)=> setDescription(e.target.value)}
                    
                />
                   Edit Image:
                    <textarea

                    id="editimageInput"
                    type="text"
                    // pattern="(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)"
                    
                    value={comment_img}
                    onChange={(e) => setComment_img(e.target.value)}
                    />

            </label>

            <button className='edit' type="submit">Edit</button>
        </form>
        </div>
    )
}

export default EditComment

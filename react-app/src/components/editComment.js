import { useState} from "react"
import { useDispatch} from "react-redux"
import { editComments } from '../store/comments'



function EditComment({ comment, setShowModal, id }) {

    const dispatch = useDispatch()
    const [description, setDescription] = useState(comment?.description);
    const [img, setImg] = useState(comment?.img);
   
    const [errors, setErrors] = useState([]);


    const handleSubmit = (e) => {
        e.preventDefault()


        let validateErrors = [];
        if (description?.length > 200) validateErrors.push('Thought cannot be longer than 200 characters');
        if (!description) validateErrors.push('Comment cannot be empty');


        if (validateErrors.length > 0) {
            setErrors(validateErrors);
            return;
        }

        const data = {
            id: id,
            description: description,
            img: img
        }


        dispatch(editComments(data, id))

            // setShowModal(false)
            // setDescription("");
            // setImg("")
    
            setErrors([])



    }

    return (
        <div className="editnote">

            
         <form onSubmit={handleSubmit} className='createUpdate'>


            <ul> {errors.map((error, i) => (<div className="errors" key={i}>{error}</div>))}</ul>

            <label>


                <textarea

                    id="editcomment"
                    type="text"
                    value={description}
                    onChange={(e)=> setDescription(e.target.value)}
                    
                />

                    <input

                    id="editimageInput"
                    type="url"
                    pattern="(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)"
                    placeholder="Want to add an image?"
                    value={img}
                    onChange={(e) => setImg(e.target.value)}
                    />

            </label>

            <button className='edit' type="submit">Edit</button>
        </form>
        </div>
    )
}

export default EditComment

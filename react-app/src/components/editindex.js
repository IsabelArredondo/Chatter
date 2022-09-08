import EditComment from './editComment'
import { useState } from "react"



function EditIndex({ comment, id }) {
    const [isNote, setIsNote] = useState(false)

    const noteHandler = async () => {
        setIsNote((prev) => !prev)
        // note dispatch will be here

    }



    return (
        <>


            <span>
                <button className={'editthought'} onClick={noteHandler}><i className="fa-solid fa-feather-pointed fa-xl"></i></button>
            </span>


            {isNote &&



                <EditComment comment={comment} id={id} />



            }
        </>
    );
}

export default EditIndex;
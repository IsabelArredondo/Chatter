import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import Comments from './Comments'


function CommentModal({thought}) {

    const [showModal, setShowModal] = useState(false);



    return (
        <>

            <button className={'comment'}onClick={() => setShowModal(true)}><i className="fa-regular fa-comment-dots fa-xl"></i></button>
            


            {showModal && (

                <Modal onClose={() => setShowModal(false)}>
                    
                    <Comments thought={thought} id={thought.id}  setShowModal={setShowModal}/>


                </Modal>
            )}
        </>
    );
}

export default CommentModal;
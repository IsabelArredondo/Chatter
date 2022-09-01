import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';
import EditPosts from './EditPost'




function EditPostModal({ thought}) {
    const [showModal, setShowModal] = useState(false);



    return (
        <>

            
            {<button className={'note'} onClick={() => setShowModal(true)}><i class="fa-solid fa-feather-pointed"></i></button>}


            {showModal && (

                <Modal onClose={() => setShowModal(false)}>
                    
                    <EditPosts thought={thought} id={thought.id} setShowModal={setShowModal} />


                </Modal>
            )}
        </>
    );
}

export default EditPostModal;
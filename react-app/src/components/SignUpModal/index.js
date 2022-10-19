import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import SignUpForm from './SignUpForm'




function SignUpModal() {
    const [showModal, setShowModal] = useState(false);



    return (
        <>

            
            {<button className={'buttonsplash'} onClick={() => setShowModal(true)}>Sign Up With Email</button>}

            {showModal && (

                <Modal onClose={() => setShowModal(false)}>
                    
                    <SignUpForm setShowModal={setShowModal} />


                </Modal>
            )}
        </>
    );
}

export default SignUpModal;
import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import LoginForm from './LoginForm'




function LoginModal() {
    const [showModal, setShowModal] = useState(false);



    return (
        <>

            
            {<button id='sign-in' className={'buttonsplash'} onClick={() => setShowModal(true)}>Sign In</button>}


            {showModal && (

                <Modal onClose={() => setShowModal(false)}>
                    
                    <LoginForm setShowModal={setShowModal} />


                </Modal>
            )}
        </>
    );
}

export default LoginModal;
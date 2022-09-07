import React, { useState } from 'react';
import {  useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import LoginModal from '../components/LoginModal'
import SignUpModal from './SignUpModal';
import { login } from '../store/session';
import './HomePage.css'


function HomePage() {
  const history = useHistory()
  const user = useSelector(state => state?.session?.user)
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});


  const demoUser = async (e) => {
    e.preventDefault();
    const email = 'DickGrayson@gmail.com';
    const password = 'password';
    const data = await dispatch(login( email, password));
    if (data) {
      setErrors(data);
    }
  };


  if(user){
      history.push('/feed')
  }
  return (
    <div className='homepagecontainer'>

       <img className='imagehomepage' alt="splash" src='https://abs.twimg.com/sticky/illustrations/lohp_en_1302x955.png' />

        <div className='signupandlogin'>

        <i id='birdicon' class="fa-solid fa-dove fa-4x"></i>

        <div id='one'>Happening now</div>
        
        <div id='two'>Join Chatter today.</div>


          <LoginModal />
          
           <div id='three'>or</div>
           
          <SignUpModal/>

          <div id='four'>Want to login as a demo user?</div>

       <div  className='demoUserBtn'>
        <button className='demoLogin' onClick={demoUser} >Demo User</button>
        </div>
        </div>

        


     </div>


  );
}

export default HomePage;
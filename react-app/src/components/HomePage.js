import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoginModal from '../components/LoginModal'
import SignUpModal from './SignUpModal';
import './HomePage.css'


function HomePage() {
  const history = useHistory()
  const user = useSelector(state => state?.session?.user)


  
  if(user){
      history.push('/feed')
  }
  return (
    <div className='homepagecontainer'>

       <img className='imagehomepage' alt="splash" src='https://abs.twimg.com/sticky/illustrations/lohp_en_1302x955.png' />

        <div className='signupandlogin'>

        <i id='birdicon' class="fa-solid fa-dove fa-4x"></i>

        <h1 id='one'>Happening now</h1>
        <h2 id='two'>Join Chatter today.</h2>


          <LoginModal />

          <SignUpModal/>

        </div>




     </div>


  );
}

export default HomePage;
import React, { useState } from 'react';
import {  useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import LoginModal from '../components/LoginModal'
import SignUpModal from './SignUpModal';
import { login } from '../store/session';
import face from '../../src/face.png'
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
    <div>
    <div className='homepagecontainer'>
    <i id='bird' className="fa-brands fa-twitter"></i>

       <img className='imagehomepage' alt="splash" src='https://abs.twimg.com/sticky/illustrations/lohp_en_1302x955.png' />

        <div className='signupandlogin'>
        <i id='birdicon' class="fa-brands fa-twitter fa-3x"></i>

        <div id='one'>Happening now</div>
        
        <div id='two'>Join Chatter today.</div>

        <button className='signupdemoLogin' onClick={demoUser} >
          <span className='something'>
          <img className='profile' alt="gmail" src='https://cdn.mos.cms.futurecdn.net/qPoCGaaUx72ekhXhRRRVum.jpg' />
          <div className='signinass' >Sign in as NightWing<br></br> <div id='usergmail'>DickGrayson@gmail.com</div></div>
          <img className='gmail' alt="gmail" src='https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/1200px-Google_%22G%22_Logo.svg.png' />
          </span>
        </button>
          <LoginModal />
          <div className="orbox">
        <div className="orboxone"></div>
        <div id='three'>or</div>
        <div className="orboxtwo"></div>
      </div>  
           
           
          <SignUpModal/>
          <div className='termsofservice'>
            By signing up, you dont agree to any Terms of Service and Privacy Policy, including Cookie Use.
          </div>
          <div id='four'>Already have an account?</div>

       <div  className='demoUserBtn'>
        <button className='demoLogin' onClick={demoUser} >Demo User</button>
        </div>
        </div>

        


     </div>
     <div className='bottom'>
     <a className = {"footer"} href={"https://github.com/IsabelArredondo"}><i className="fa-brands fa-github"></i> GitHub </a> 
     <a className = {"footer"} href={"https://www.linkedin.com/in/IsabelArredondo-1107a9186"}><i className="fa-brands fa-linkedin"></i> linkedin </a>
     <a className = {"footer"} href={"https://isabelarredondo.github.io/"}> <img src={face} className="profilePic"></img> profolio </a> 
     <a className = {"footer"} href={"https://hubble-app.herokuapp.com/"}><i class="fa-solid fa-user-astronaut"></i> Hubble </a>
     <a className = {"footer"} href={"https://hubble-app.herokuapp.com/"}><i class="fa-brands fa-airbnb"></i> AirBnb </a> 
    </div> 
     </div>
  );
}

export default HomePage;
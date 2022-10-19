import React from 'react';
import { useSelector } from 'react-redux';
import SignUpForm from './SignUpModal/SignUpForm';
import face from '../../src/face.png'
import { Link, useHistory } from 'react-router-dom';
import './HomePage.css'


function SignupPage() {
  const history = useHistory()
  const user = useSelector(state => state?.session?.user)

  if (user) {
    history.push('/feed')
  }
  return (
    <div>
      <div className='homepagecontainer'>

        <i id='bird' className="fa-brands fa-twitter"></i>

        <img className='imagehomepage' alt="splash" src='https://abs.twimg.com/sticky/illustrations/lohp_en_1302x955.png' />
        <Link to={'/'} ><i className="fa-solid fa-arrow-left backbutton"></i></Link>
        <div className='signupandlogin' id='page'>
          <SignUpForm />
        </div>


      </div>
      <div className='bottom'>
        <a className={"footer"} href={"https://github.com/IsabelArredondo"}><i className="fa-brands fa-github"></i> GitHub </a>
        <a className={"footer"} href={"https://www.linkedin.com/in/IsabelArredondo-1107a9186"}><i className="fa-brands fa-linkedin"></i> linkedin </a>
        <a className={"footer"} href={"https://isabelarredondo.github.io/"}> <img src={face} className="profilePic"></img> profolio </a>
        <a className={"footer"} href={"https://hubble-app.herokuapp.com/"}><i class="fa-solid fa-user-astronaut"></i> Hubble </a>
        <a className={"footer"} href={"https://hubble-app.herokuapp.com/"}><i class="fa-brands fa-airbnb"></i> AirBnb </a>
      </div>
    </div>
  );
}

export default SignupPage;
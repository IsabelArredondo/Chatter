import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
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
        <i  class="fa-solid fa-dove fa-4x"></i>

        <h1 id='one'>Happening now</h1>
        <h2 id='two'>Join Twitter today.</h2>


        <NavLink to='/login' className={'buttonsplash'} exact={true} activeClassName='active'>
         

            Sign In
          </NavLink>

            <NavLink to='/sign-up' className={'buttonsplash'} exact={true} activeClassName='active'>
               Sign Up With Email
            </NavLink>
        </div>




     </div>


  );
}

export default HomePage;
import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';

import { useSelector } from 'react-redux';


function HomePage() {
  const history = useHistory()
  const user = useSelector(state => state?.session?.user)
  
  if(user){
      history.push('/feed')
  }
  return (
    <div className=''>
  
        <div className=''>
        <NavLink to='/login' className={''} exact={true} activeClassName='active'>
            Login
          </NavLink>
        </div>


        <div  className='' >
            <NavLink to='/sign-up' className={''} exact={true} activeClassName='active'>
               Sign Up
            </NavLink>
        </div>




     </div>


  );
}

export default HomePage;
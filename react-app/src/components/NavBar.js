import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import './NavBar.css'

const NavBar = () => {
  return (
    
      <div className='NavBar'>
        <div className='dove'>
          <NavLink to='/' exact={true} activeClassName='active'>
           <i className="fa-solid fa-dove fa-2x home"></i>
          </NavLink>
        </div>
        {/* <li>
          <NavLink to='/login' exact={true} activeClassName='active'>
            Login
          </NavLink>
        </li>
        <li>
          <NavLink to='/sign-up' exact={true} activeClassName='active'>
            Sign Up
          </NavLink>
        </li>
        <li>
          <NavLink to='/users' exact={true} activeClassName='active'>
            Users
          </NavLink>
        </li> */}

        <div className='NavLogOut'>

          <NavLink className={'sidebarhome'} to='/' exact={true} activeClassName='active'>
          <i class="fa-solid fa-house"></i>
          <span>Home</span>
          </NavLink>

          <LogoutButton />
        </div>
      </div>
    
  );
}

export default NavBar;

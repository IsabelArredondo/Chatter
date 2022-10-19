import React from 'react';
import { useSelector} from 'react-redux'
import { NavLink, Link } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import './NavBar.css'

const NavBar = () => {
  const user = useSelector(state => state?.session?.user)
  return (
    
      <div className='NavBar'>
        <div className='dove'>
          <NavLink to='/' exact={true} activeClassName='active'>
          <i id='birdicon' class="fa-brands fa-twitter fa-3x home"></i>
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
          <i class="fa-solid fa-house"></i> Home
          </NavLink>

          <Link to={`/posts/user/${user?.id}`} key={user?.id} className='Profilebutton'>Your Profile</Link>

          <LogoutButton />
        </div>
      </div>
    
  );
}

export default NavBar;

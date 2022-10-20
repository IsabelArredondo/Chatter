import React from 'react';
import { useSelector } from 'react-redux'
import { NavLink, Link } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import './NavBar.css'

const NavBar = () => {
  const user = useSelector(state => state?.session?.user)

  return (

    <div className='NavBar'>

      <NavLink to='/' exact={true} >
        <i className="fa-brands fa-twitter home"></i>
      </NavLink>



      <Link id='homeicon' className={'sidebarhome'} to='/' exact={true} >
        <i id='icons' className="fa-solid fa-house"></i> Home 
      </Link>

      <Link to={`/posts/user/${user?.id}`} key={user?.id} className='Profilebutton'><i id='icons' className="fa-solid fa-user-secret"></i> Profile </Link>

      <a className={"sidebarhome"} href={"https://github.com/IsabelArredondo"}><i id='icon' className="fa-brands fa-github"></i> GitHub </a>
      <a className={"sidebarhome"} href={"https://www.linkedin.com/in/IsabelArredondo-1107a9186"}><i id='icon' className="fa-brands fa-linkedin"></i> linkedin </a>
      <a className={"sidebarhome"} href={"https://isabelarredondo.github.io/"}> <i id='icon' className="fa-solid fa-robot"></i> profolio </a>


      <LogoutButton />


    </div>

  );
}

export default NavBar;

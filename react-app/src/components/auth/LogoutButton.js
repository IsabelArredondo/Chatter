import React , {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/session';
import './logout.css'

const LogoutButton = () => {
  const user = useSelector(state => state?.session?.user)

  const [showMenu, setShowMenu] = useState(false)

  const openMenu = () => {
      if (showMenu) return
      setShowMenu(true)
  }

  useEffect(() => {
      if (!showMenu) return

      const closeMenu = () => {
          setShowMenu(false)
      }
      document.addEventListener('click', closeMenu)
      return () => document.removeEventListener("click", closeMenu);
  }, [showMenu])

  const dispatch = useDispatch()
  const onLogout = async (e) => {
    await dispatch(logout());
  };

  return    (
    <>
  <button className='signupdemoLogin' id='logout' onClick={onLogout} >
  <span className='something'>
  <img className='profile' id='logoutpic' alt="gmail" src={`${user.profileImage}`} />
  <div className='signinass' id='logoutinfo'>{`${user.username}`}<br></br> <div id='usergmail'>{`${user.email}`}</div></div>
      <i className="fa-solid fa-right-from-bracket logicon"></i>

  </span>

</button>
</>
)      
};

export default LogoutButton;

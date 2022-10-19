import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import { Link } from 'react-router-dom';

const LoginForm = ({setShowModal}) => {
  const [errors, setErrors] = useState({});
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const demoUser = async (e) => {
    e.preventDefault();
    const email = 'DickGrayson@gmail.com';
    const password = 'password';
    const data = await dispatch(login( email, password));
    if (data) {
      setErrors(data);
    }
  };

  const close = (e) => {
    e.preventDefault();

    setShowModal(false)

  };

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    
    if(data){
      setErrors(data)
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {

    return <Redirect to='/feed' />;
  }

  return (   
    <>       

   {/* <button className="buttonclose" onClick={close}><i className="fa-solid fa-x"></i></button> */}
<div>
<i  className="fa-brands fa-twitter fa-2x login"></i>
    <div className='signUpFormContainer'>
 
    <div className='signup'>Sign in to Chatter</div>



    <form className='signUpForm' onSubmit={onLogin}>  
      
        <label htmlFor='email'>Email</label>

      <div>
          {errors?.email &&
          <div className="error">
              {errors?.email?.map((error, ind) => (
                <div key={ind}>{error}</div>
              ))}
          </div>
          }

        <input
          className='signupInput'
          name='email'
          type='text'
          placeholder='Email'
          value={email}
          onChange={updateEmail}
        />

      </div>
              <label htmlFor='password'>Password</label>
      
          {errors?.password &&
          <div className="error">
              {errors?.password?.map((error, ind) => (
                <div key={ind}>{error}</div>
              ))}
          </div>
          }
        <input
          className='signupInput'
          name='password'
          type='password'
          placeholder='Password'
          value={password}
          onChange={updatePassword}
        />

        <button className = 'loginbutton' type='submit'>Login</button>
      
    </form>
  <div className="orboxlogin">
        <div className="orboxone"></div>
        <div id='three'>or</div>
        <div className="orboxtwo"></div>
      </div> 
    <button className='signupdemoLogin' id='logincomponent' onClick={demoUser} >
          <span className='something'>
          <img className='profile' alt="gmail" src='https://cdn.mos.cms.futurecdn.net/qPoCGaaUx72ekhXhRRRVum.jpg' />
          <div className='signinass' >Sign in as NightWing<br></br> <div id='usergmail'>DickGrayson@gmail.com</div></div>
          <img className='gmail' alt="gmail" src='https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/1200px-Google_%22G%22_Logo.svg.png' />
          </span>
        </button>
  <div className='box'>Don't have an account? <Link to={`/sign-up`} className='signuplink'>Sign Up</Link></div>
          

    </div>
    </div>
    </> 
  );
};

export default LoginForm;

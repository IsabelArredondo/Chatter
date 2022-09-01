import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';

const LoginForm = ({setShowModal}) => {
  const [errors, setErrors] = useState({});
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    setShowModal(false)
    return <Redirect to='/feed' />;
  }

  return (
    <div className='signUpFormContainer'>
      <i className="fa-solid fa-dove fa-2x login"></i>
    <h1>Sign in to Chatter</h1>
    <form className='signUpForm' onSubmit={onLogin}>
      

      <div>
        <label htmlFor='email'>Email</label>
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
      <div>
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

        <button className = 'signupBtn' type='submit'>Login</button>
      </div>
    </form>
    </div>
  );
};

export default LoginForm;

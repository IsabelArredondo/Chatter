import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import './SignUpForm.css'


const SignUpForm = ({setShowModal}) => {
  const [errors, setErrors] = useState({});
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const close = (e) => {
    e.preventDefault();

    setShowModal(false)

  };

  const onSignUp = async (e) => {
    e.preventDefault();
    const formData = new FormData()
    formData.append('username', username)
    formData.append('email', email)
    formData.append('password', password)
    formData.append('profileImage', profileImage)

    if (password === repeatPassword) {
      const data = await dispatch(signUp(formData));
      if (data) {
        setErrors(data)
      }
    }else{
        let err = {'repeatePassword':['Password and Repeat password does not match']}
        setErrors(err)
    }
    // let errorimage = /^http[^ \!@\$\^&\(\)\+\=]+(\.png|\.jpeg|\.gif|\.jpg)$/;
    // if (profileImage && !profileImage.match(errorimage)) {
    //   let error = {'Image':['Image must start with https and end with .png/.jpeg/.gif/.jpg']}
    //   setErrors(error)
    // } 
    // , validators=[ Regexp('(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)', flags=0, message='Image must start with https and end with .png/.jpeg/.gif/.jpg')]
    
    
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };
  // const updateProfileImage = (e) => {
  //   setProfileImage(e.target.value);
  // };


const allowedTypes = ["png", "jpg", "jpeg", "webp"]

  const updateProfileImage = (e) => {
    setErrors([])
    const file = e.target.files[0];
    setProfileImage(file)
  
}

  if (user) {
    
    return <Redirect to='/feed' />;
  }

  return ( 
    <>      
    <div>
      {/* <button className="buttonclose" onClick={close}><i className="fa-solid fa-x"></i></button> */}
      </div> 

    <div className='signUpFormContainer'>
      {/* <i className="fa-solid fa-dove fa-2x login"></i> */}
      <div className='signup'>Create your account</div>
      <form className='signUpForm' onSubmit={onSignUp} >
        Username:
        <div>
          {errors?.username &&
          <div className="error">
              {errors?.username?.map((error, ind) => (
                <div key={ind}>{error}</div>
              ))}
          </div>
          }
          <input className='signupInput'
            type='text'
            name='username'
            onChange={updateUsername}
            placeholder='Username'
            value={username}
          ></input>

        </div>
      Email:  
      <div>
        {errors?.email &&
          <div className="error">
            {errors?.email?.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div>
        }
        
        <input
          type='text'
          name='email'
          onChange={updateEmail}
          placeholder='Email'
          value={email}
          className='signupInput'
        ></input>
      </div>
      Password:
      <div>
        {errors?.password &&
          <div className="error">
              {errors?.password?.map((error, ind) => (
                <div key={ind}>{error}</div>
              ))}
          </div>}
        
        <input
          type='password'
          name='password'
          placeholder='Password'
          onChange={updatePassword}
          value={password}
          className='signupInput'

        ></input>


      </div>
      Repeat Password:
      <div>
        
        <input
          type='password'
          name='repeat_password'
          placeholder='Repeate Password'
          onChange={updateRepeatPassword}
          value={repeatPassword}
          className='signupInput'


        ></input>
        {errors?.repeatePassword &&
          <div className="error">
              {errors?.repeatePassword?.map((error, ind) => (
                <div key={ind}>{error}</div>
              ))}
          </div>}
      </div>
       Optional Profile Image: 
      <div>
         {errors?.profileImage &&
          <div className="error">
              {errors?.profileImage?.map((error, ind) => (
                <div key={ind}>{error}</div>
              ))}
          </div>
          }
       
        <input
          // type="url"
          // pattern="(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)"
          name='profile_image'
          // placeholder='must start with https and end with .jpg/.gif/.png'
          // onChange={updateProfileImage}
          // value={profileImage}
          className=''
          type="file"
          accept="image/*"
          onChange={updateProfileImage}
        ></input>
 
      </div>
      <button  className = 'signupBtn' type='submit'>Sign Up</button>
    </form>
    </div>
    </>
  );
};

export default SignUpForm;
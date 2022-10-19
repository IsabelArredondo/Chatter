import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/LoginModal/LoginForm';
import SignUpForm from './components/SignUpModal/SignUpForm';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import HomePage from './components/HomePage';
import HomeFeed from './components/HomeFeed'
import UserPosts from './components/UserPosts';
import SignupPage from './components/SignupPage'
import { authenticate } from './store/session';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      
      <Switch>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignupPage />
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <Route path='/' exact={true} >
          <HomePage />
        </Route>
        <ProtectedRoute path='/feed' exact={true} >
           <HomeFeed />
        </ProtectedRoute>
        <ProtectedRoute path='/posts/user/:userid' exact={true} >
           <UserPosts />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;

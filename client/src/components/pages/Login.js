import React from 'react';
import Auth from '../auth/Auth';

const Login = props => {
  return (
    <div className='Landing'>
      <h1 className='Landing__header'>
        Welcome to Routiner<span className='logo-highlight'>.</span>
      </h1>
      <Auth />
    </div>
  );
};

export default Login;

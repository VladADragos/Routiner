import React, { useState, useContext, useEffect } from 'react';
import UserContext from '../../context/user/userContext';
import AlertContext from '../../context/alert/alertContext';
const Auth = props => {
  const userContext = useContext(UserContext);
  const alertContext = useContext(AlertContext);

  const { setAlert } = alertContext;
  const {
    register,
    login,
    isAuthenticated,
    clearErrors,
    error,
    loadUser
  } = userContext;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/home');
    }
    if (error === 'Invalid credentials') {
      setAlert(error, 'danger');
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  const initialState = {
    name: '',
    password: '',
    password2: ''
  };

  const [user, setUser] = useState(initialState);
  const [isRegistering, setRegistering] = useState(false);

  const { name, password, password2 } = user;

  const fieldsAreValid = () => {
    const requiredPasswordLength = 6;
    if (name === '' || password === '') {
      setAlert('Please fill in all fields', 'danger');
      return false;
    }
    if (isRegistering) {
      if (password !== password2) {
        setAlert('Passwords do not match', 'danger');
        return false;
      } else if (password.length < requiredPasswordLength) {
        setAlert(
          `Please enter a ${requiredPasswordLength} character password or longer`,
          'danger'
        );
        return false;
      }
    }
    return true;
  };

  const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });
  const onSubmit = e => {
    e.preventDefault();
    if (fieldsAreValid()) {
      if (isRegistering) {
        register({ name, password });
      } else {
        login({ name, password });
      }
    }
  };

  return (
    <div className='Auth'>
      <h1 className='Auth__header'>
        Welcome to Routiner<span className='logo-highlight'>.</span>
      </h1>
      <form className='Auth-form' onSubmit={onSubmit}>
        <div className='form-group'>
          <label className='Auth-form__label' htmlFor='name'>
            Name:
          </label>
          <input
            className='Auth-form__input input'
            type='text'
            name='name'
            onChange={onChange}
          />
        </div>
        <div className='form-group'>
          <label className='Auth-form__label' htmlFor='password'>
            Password:
          </label>
          <input
            className='Auth-form__input input'
            type='password'
            name='password'
            onChange={onChange}
          />
        </div>
        {isRegistering && (
          <div className='form-group'>
            <label className='Auth-form__label' htmlFor='password2'>
              Confirm:
            </label>
            <input
              className='Auth-form__input input'
              type='password'
              name='password2'
              onChange={onChange}
            />
          </div>
        )}
        <div className='Auth-form__bottom'>
          <input
            type='submit'
            className='Auth-form__submit btn'
            value={!isRegistering ? 'Login' : 'Register'}
          />
          <p className='Auth-form__register-text'>
            <span className='Auth-form__register-highlight'>or</span>{' '}
            <a
              className='Auth-form__register-link'
              href='#!'
              onClick={() => setRegistering(!isRegistering)}>
              {isRegistering ? 'Login' : 'Register'}
            </a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Auth;

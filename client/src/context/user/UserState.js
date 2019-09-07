import React, { useReducer } from 'react';
import UserContext from './userContext';
import UserReducer from './userReducer';
import { User } from '../types';
import setAuthToken from '../../utils/setAuthToken';
import axios from 'axios';
const UserState = props => {
  const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null,
    routines: null,
    error: null
  };

  const [state, dispatch] = useReducer(UserReducer, initialState);

  // register user
  const register = async formData => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    try {
      const res = await axios.post('/api/users', formData, config);
      dispatch({ type: User.REGISTER_SUCCESS, payload: res.data });
      loadUser();
    } catch (err) {
      dispatch({ type: User.REGISTER_FAIL, payload: err.response.data.msg });
    }
  };

  // login user
  const login = async formData => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.post('/api/auth', formData, config);

      dispatch({
        type: User.REGISTER_SUCCESS,
        payload: res.data
      });

      loadUser();
    } catch (err) {
      dispatch({
        type: User.LOGIN_FAIL,
        payload: err.response.data.msg
      });
    }
  };

  // logout user
  const logout = () => {
    dispatch({ type: User.LOGOUT });
  };

  // load user
  const loadUser = async () => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    try {
      const res = await axios.get('/api/auth');
      dispatch({ type: User.LOADED, payload: res.data });
    } catch (err) {
      dispatch({ type: User.AUTH_ERROR });
    }
  };

  // clear errors
  const clearErrors = () => {
    dispatch({ type: User.CLEAR_ERRORS });
  };

  const { isAuthenticated, loading, user, routines, error } = state;
  return (
    <UserContext.Provider
      value={{
        isAuthenticated,
        user,
        loading,
        routines,
        error,
        register,
        login,
        clearErrors,
        logout,
        loadUser
      }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;

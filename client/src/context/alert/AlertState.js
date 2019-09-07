import React, { useReducer } from 'react';
import AlertContext from './alertContext';
import uuid from 'uuid';
import AlertReducer from './alertReducer';
import { Alert } from '../types';

const AlertState = props => {
  const initialState = [];

  const [state, dispatch] = useReducer(AlertReducer, initialState);

  const setAlert = (msg, type, timeout = 5000) => {
    const id = uuid.v4();
    dispatch({ type: Alert.SET, payload: { msg, type, id } });

    setTimeout(() => dispatch({ type: Alert.REMOVE, payload: id }), timeout);
  };

  return (
    <AlertContext.Provider
      value={{
        alerts: state,
        setAlert
      }}>
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertState;

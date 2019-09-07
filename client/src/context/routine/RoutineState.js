import React, { useReducer } from 'react';
import RoutineContext from './routineContext';
import RoutineReducer from './routineReducer';
// import { Activity } from '../types';
import uuid from 'uuid/v4';
import { Routine } from '../types';
import axios from 'axios';

const RoutineState = props => {
  const initialState = {
    routines: null, // array of user routines
    current: null, // selected routine
    isLoading: true
  };

  const [state, dispatch] = useReducer(RoutineReducer, initialState);

  const { routines, current, isLoading } = state;

  // load user routines

  const loadRoutines = async () => {
    try {
      const res = await axios.get('/api/routines');
      dispatch({ type: Routine.LOAD_ALL, payload: res.data });
    } catch (err) {
      console.log(err);
    }
  };
  const loadRoutine = async id => {
    try {
      // const res = await axios.get(`/api/routines?${id}`);
      // dispatch({ type: Routine.LOAD_ONE, payload: res.data });
      dispatch({ type: Routine.LOAD_ONE, payload: id });
    } catch (err) {
      console.log(err);
    }
  };

  const addRoutine = ({ name, season }) => {
    const id = uuid();
    const newRoutine = {
      id,
      name,
      season
    };

    dispatch({ type: Routine.ADD, payload: newRoutine });
  };
  const removeRoutine = id => {
    dispatch({ type: Routine.REMOVE, payload: id });
  };

  const updateRoutine = routine => {
    dispatch({ type: Routine.UPDATE, payload: routine });
  };

  const selectRoutine = routine => {
    dispatch({ type: Routine.SELECT, payload: routine });
  };
  const clearSelectedRoutine = routine => {
    dispatch({ type: Routine.CLEAR_SELECTED });
  };
  return (
    <RoutineContext.Provider
      value={{
        routines,
        current,
        loadRoutines,
        loadRoutine,
        addRoutine,
        removeRoutine,
        updateRoutine,
        selectRoutine,
        clearSelectedRoutine,
        isLoading
      }}>
      {props.children}
    </RoutineContext.Provider>
  );
};

export default RoutineState;

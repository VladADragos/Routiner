import React, { useReducer } from 'react';
import RoutineContext from './routineContext';
import RoutineReducer from './routineReducer';
// import { Activity } from '../types';
import uuid from 'uuid/v4';
import { Routine, Activity } from '../types';
import axios from 'axios';

const RoutineState = props => {
  const initialState = {
    routines: null, // array of user routines
    current: null, // selected routine
    isLoading: true
  };

  const [state, dispatch] = useReducer(RoutineReducer, initialState);

  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  // load user routines
  const loadRoutines = async () => {
    try {
      const res = await axios.get('/api/routines');
      dispatch({ type: Routine.LOAD_ALL, payload: res.data });
      console.log('routines loaded');
    } catch (err) {
      console.log(err);
    }
  };
  const loadRoutine = async id => {
    try {
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

  const addActivity = async (routineId, day, activity) => {
    try {
      const res = await axios.post(
        '/api/activities',
        { activity, routineId, day },
        config
      );
      console.log(res.data);
      dispatch({
        type: Activity.ADD,
        payload: { day, activity: res.data }
      });
    } catch (err) {
      console.log(err);
    }
  };

  const removeActivity = async (activityId, day, routineId) => {
    try {
      await axios.delete(
        `/api/activities/${activityId}`,
        { data: { routineId, day } },
        config
      );
      dispatch({ type: Activity.REMOVE, payload: { day, activityId } });
    } catch (err) {
      console.log(err);
    }
  };
  const updateActivity = ({ name, from, to }) => {
    const id = uuid();

    const newActivity = { id, name, from, to };

    dispatch({ type: Activity.ADD, payload: newActivity });
  };

  return (
    <RoutineContext.Provider
      value={{
        routines: state.routines,
        current: state.current,
        isLoading: state.isLoading,
        loadRoutines,
        loadRoutine,
        addRoutine,
        removeRoutine,
        updateRoutine,
        selectRoutine,
        clearSelectedRoutine,
        addActivity,
        updateActivity,
        removeActivity
      }}>
      {props.children}
    </RoutineContext.Provider>
  );
};

export default RoutineState;

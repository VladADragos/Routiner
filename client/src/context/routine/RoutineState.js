import React, { useReducer } from "react";
import RoutineContext from "./routineContext";
import RoutineReducer from "./routineReducer";
import { Routine, Activity } from "../types";
import axios from "axios";

const RoutineState = props => {
  const initialState = {
    routines: null, // array of user routines
    current: null, // selected routine
    isLoading: true
  };

  const [state, dispatch] = useReducer(RoutineReducer, initialState);

  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  // load user routines
  const loadRoutines = async () => {
    try {
      const res = await axios.get("/api/routines");
      dispatch({ type: Routine.LOAD_ALL, payload: res.data });
    } catch (err) {
      console.log(err);
    }
  };
  const loadRoutine = async id => {
    try {
      const res = await axios.get(`/api/routines/${id}`);
      dispatch({ type: Routine.LOAD_ONE, payload: res.data });
    } catch (err) {
      console.log(err);
    }
  };

  const addRoutine = async routine => {
    const res = await axios.post("/api/routines", routine, config);
    dispatch({ type: Routine.ADD, payload: res.data });
  };
  const removeRoutine = async id => {
    try {
      await axios.delete(`/api/routines/${id}`);
      dispatch({ type: Routine.REMOVE, payload: id });
    } catch (err) {
      console.log(err);
    }
  };

  const updateRoutine = async routine => {
    try {
      const res = await axios.put(
        `/api/routines/${routine._id}`,
        routine,
        config
      );
      dispatch({ type: Routine.UPDATE, payload: res.data });
    } catch (err) {
      console.log(err);
    }
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
        "/api/activities",
        { activity, routineId, day },
        config
      );
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
  const updateActivity = async (activity, routineId, day) => {
    try {
      const res = await axios.put(
        `/api/activities/${activity._id}`,
        { routineId, day, ...activity },
        config
      );
      dispatch({
        type: Activity.UPDATE,
        payload: { routineId, day, activity: res.data }
      });
    } catch (err) {
      console.log(err);
    }
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
      }}
    >
      {props.children}
    </RoutineContext.Provider>
  );
};

export default RoutineState;

import { Routine, Activity } from '../types';
export default (state, { type, payload }) => {
  switch (type) {
    case Routine.LOAD_ALL:
      return { ...state, isLoading: false, routines: payload };
    case Routine.ADD:
      return { ...state, routines: [payload, ...state.routines] };
    case Routine.REMOVE:
      return {
        ...state,
        routines: state.routines.filter(routine => routine._id !== payload)
      };
    case Routine.LOAD_ONE:
      return {
        ...state,
        current: state.routines.find(routine => routine._id === payload),
        isLoading: false
      };
    case Routine.UPDATE:
      return {
        ...state,
        routines: state.routines.map(routine => {
          return routine._id === payload._id
            ? { ...routine, name: payload.name, season: payload.season }
            : routine;
        })
      };
    case Routine.SELECT:
      return {
        ...state,
        current: payload
      };
    case Activity.ADD:
      return {
        ...state,
        current: {
          ...state.current,
          days: {
            ...state.current.days,
            [payload.day]: [
              payload.activity,
              ...state.current.days[payload.day]
            ]
          }
        }
      };
    case Activity.REMOVE:
      return {
        ...state,
        current: {
          ...state.current,
          days: {
            ...state.current.days,
            [payload.day]: [
              ...state.current.days[payload.day].filter(
                activity => activity._id !== payload.activityId
              )
            ]
          }
        }
      };
    default:
      return state;
  }
};

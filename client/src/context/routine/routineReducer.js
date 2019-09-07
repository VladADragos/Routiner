import { Routine } from '../types';
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
    default:
      return state;
  }
};
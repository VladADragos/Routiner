import { User } from '../types';
export default (state, { type, payload }) => {
  switch (type) {
    case User.REGISTER_SUCCESS:
    case User.LOGIN_SUCCESS:
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false
      };
    case User.LOGIN_FAIL:
    case User.REGISTER_FAIL:
    case User.AUTH_ERROR:
    case User.LOGOUT:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: null,
        loading: false,
        user: null,
        error: payload
      };
    case User.CLEAR_ERRORS:
      return {
        ...state,
        error: null
      };
    case User.LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload
      };
    default:
      return state;
  }
};

import { Alert } from '../types';
export default (state, { type, payload }) => {
  switch (type) {
    case Alert.SET:
      return [...state, payload];
    case Alert.REMOVE:
      return state.filter(alert => alert.id !== payload);
    default:
      return state;
  }
};

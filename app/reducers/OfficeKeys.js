import { FETCH_OFFICEKEY_SUCCESS, ADD_OFFICEKEY_SUCCESS, DELETE_OFFICEKEY_SUCCESS } from '../actions/ActionTypes';

const OfficeKeys = (state = null, {
  type, keys, endpoint, key, cookie,
}) => {
  switch (type) {
    case FETCH_OFFICEKEY_SUCCESS: {
      const newState = {};
      keys.forEach((item) => { newState[item.endpoint] = [item.apiKey, item.cookie]; });
      return keys.length === 0 ? null : newState;
    }
    case ADD_OFFICEKEY_SUCCESS:
      return state ? { ...state, [endpoint]: [key, cookie] } : { [endpoint]: [key, cookie] };
    case DELETE_OFFICEKEY_SUCCESS: {
      if (state === null) return null;
      const newState = { ...state };
      delete newState[endpoint];
      return Object.keys(newState).length === 0 ? null : newState;
    }
    default:
      return state;
  }
};

export default OfficeKeys;

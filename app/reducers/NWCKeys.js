import { FETCH_NWCKEY_SUCCESS, ADD_NWCKEY_SUCCESS, DELETE_NWCKEY_SUCCESS } from '../actions/ActionTypes';

const NWCKeys = (state = null, {
  type, keys, tenant, key,
}) => {
  switch (type) {
    case FETCH_NWCKEY_SUCCESS: {
      const newState = {};
      keys.forEach((item) => { newState[item.tenant] = item.apiKey; });
      return keys.length === 0 ? null : newState;
    }
    case ADD_NWCKEY_SUCCESS:
      return state ? { ...state, [tenant]: key } : { [tenant]: key };
    case DELETE_NWCKEY_SUCCESS: {
      if (state === null) return null;
      const newState = { ...state };
      delete newState[tenant];
      return Object.keys(newState).length === 0 ? null : newState;
    }
    default:
      return state;
  }
};

export default NWCKeys;

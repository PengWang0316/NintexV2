import { FETCH_NWCKEY_SUCCESS, ADD_NWCKEY_SUCCESS, DELETE_NWCKEY_SUCCESS } from '../actions/ActionTypes';

const NWCKeys = (state = { isFetch: false, data: null }, {
  type, keys, tenant, key,
}) => {
  switch (type) {
    case FETCH_NWCKEY_SUCCESS: {
      const data = {};
      keys.forEach((item) => { data[item.tenant] = item.apiKey; });
      return { isFetch: true, data: keys.length === 0 ? null : data };
    }
    case ADD_NWCKEY_SUCCESS:
      return { isFetch: true, data: state.data ? { ...state.data, [tenant]: key } : { [tenant]: key } };
    case DELETE_NWCKEY_SUCCESS: {
      if (state.data === null) return { isFetch: true, data: null };
      const data = { ...state.data };
      delete data[tenant];
      return { isFetch: true, data: Object.keys(data).length === 0 ? null : data };
    }
    default:
      return state;
  }
};

export default NWCKeys;

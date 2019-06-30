import {
  FETCH_OFFICEKEY_SUCCESS, ADD_OFFICEKEY_SUCCESS, DELETE_OFFICEKEY_SUCCESS,
  OfficeKeysType, OfficeKeyActionType,
} from './types';

const OfficeKeys = (
  state: OfficeKeysType = { isFetch: false, data: null },
  {
    type, keys, endpoint, key, cookie, id,
  }: OfficeKeyActionType,
): OfficeKeysType => {
  switch (type) {
    case FETCH_OFFICEKEY_SUCCESS: {
      const data = {};
      keys.forEach((item) => { data[item.endpoint] = [item.id, item.apiKey, item.cookie]; });
      return { isFetch: true, data: keys.length === 0 ? null : data };
    }
    case ADD_OFFICEKEY_SUCCESS:
      return { isFetch: true, data: state.data ? { ...state.data, [endpoint]: [id, key, cookie] } : { [endpoint]: [id, key, cookie] } };
    case DELETE_OFFICEKEY_SUCCESS: {
      if (state.data === null) return { isFetch: true, data: null };
      const data = { ...state.data };
      delete data[endpoint];
      return { isFetch: true, data: Object.keys(data).length === 0 ? null : data };
    }
    default:
      return state;
  }
};

export default OfficeKeys;

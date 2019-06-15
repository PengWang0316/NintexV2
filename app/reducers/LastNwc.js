import { UPDATE_NWC_LAST_DATE_SUCCESS } from '../actions/ActionTypes';

const LastNwc = (state = {}, { type, tenant, lastDate }) => {
  switch (type) {
    case UPDATE_NWC_LAST_DATE_SUCCESS:
      return { ...state, [tenant]: lastDate };
    default:
      return state;
  }
};

export default LastNwc;

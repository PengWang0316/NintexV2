import { UPDATE_NWC_LAST_DATE_SUCCESS, LastNwc, UpdateLastDateType } from './types';

const LastNwc = (state: LastNwc = {}, { type, tenant, lastDate }: UpdateLastDateType): LastNwc => {
  switch (type) {
    case UPDATE_NWC_LAST_DATE_SUCCESS:
      return { ...state, [tenant]: lastDate };
    default:
      return state;
  }
};

export default LastNwc;

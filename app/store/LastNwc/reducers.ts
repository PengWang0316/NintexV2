import { UPDATE_NWC_LAST_DATE_SUCCESS, LastNwcType, UpdateLastDateType } from './types';

const LastNwc = (
  state: LastNwcType = {},
  { type, tenant, lastDate }: UpdateLastDateType,
): LastNwcType => {
  switch (type) {
    case UPDATE_NWC_LAST_DATE_SUCCESS:
      return { ...state, [tenant]: lastDate };
    default:
      return state;
  }
};

export default LastNwc;

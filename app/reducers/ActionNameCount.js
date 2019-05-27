import { FETCH_ACTION_NAME_COUNT_SUCCESS } from '../actions/ActionTypes';

const actionNameCount = (
  state = { isFetched: false, data: [] }, { type, actionNameCount: count },
) => {
  switch (type) {
    case FETCH_ACTION_NAME_COUNT_SUCCESS:
      return { isFetched: true, data: count };
    default:
      return state;
  }
};
export default actionNameCount;

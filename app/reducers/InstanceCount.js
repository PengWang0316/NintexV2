import { FETCH_INSTANCE_COUNT_SUCCESS } from '../actions/ActionTypes';

const instanceCount = (state = null, { type, instanceCount: count }) => {
  switch (type) {
    case FETCH_INSTANCE_COUNT_SUCCESS:
      return count;
    default:
      return state;
  }
};
export default instanceCount;

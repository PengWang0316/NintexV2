import { FETCH_PUBLISHER_COUNT_SUCCESS } from '../actions/ActionTypes';

const publisherCount = (state = null, { type, publisherCount: count }) => {
  switch (type) {
    case FETCH_PUBLISHER_COUNT_SUCCESS:
      return count;
    default:
      return state;
  }
};
export default publisherCount;

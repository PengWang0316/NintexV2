import { FETCH_TOP_PUBLISHERS_COUNT_SUCCESS } from '../actions/ActionTypes';

const topPublishersCount = (
  state = { isFetched: false, data: [] }, { type, topPublishersCount: count },
) => {
  switch (type) {
    case FETCH_TOP_PUBLISHERS_COUNT_SUCCESS:
      return { isFetched: true, data: count };
    default:
      return state;
  }
};
export default topPublishersCount;

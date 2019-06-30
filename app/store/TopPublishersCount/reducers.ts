import { FETCH_TOP_PUBLISHERS_COUNT_SUCCESS, TopPublisherCountActionType, TopPublishersCountType } from './types';

const topPublishersCount = (
  state: TopPublishersCountType = { isFetched: false, data: [] },
  { type, topPublishersCount: count }: TopPublisherCountActionType,
): TopPublishersCountType => {
  switch (type) {
    case FETCH_TOP_PUBLISHERS_COUNT_SUCCESS:
      return { isFetched: true, data: count };
    default:
      return state;
  }
};
export default topPublishersCount;

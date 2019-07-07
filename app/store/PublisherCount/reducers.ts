import { FETCH_PUBLISHER_COUNT_SUCCESS, PublisherCountActionType } from './types';

const publisherCount = (
  state: number = null, { type, publisherCount: count }: PublisherCountActionType,
): number => {
  switch (type) {
    case FETCH_PUBLISHER_COUNT_SUCCESS:
      return count;
    default:
      return state;
  }
};
export default publisherCount;

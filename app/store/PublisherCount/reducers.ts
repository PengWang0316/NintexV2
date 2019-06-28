import { FETCH_PUBLISHER_COUNT_SUCCESS, OfficeKeyActionType } from './types';

const publisherCount = (
  state: number = null, { type, publisherCount: count }: OfficeKeyActionType,
): number => {
  switch (type) {
    case FETCH_PUBLISHER_COUNT_SUCCESS:
      return count;
    default:
      return state;
  }
};
export default publisherCount;

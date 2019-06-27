import { FETCH_INSTANCE_COUNT_SUCCESS, FetchInstanceCountType } from './types';

const instanceCount = (
  state: number = null,
  { type, instanceCount: count }: FetchInstanceCountType,
): number | null => {
  switch (type) {
    case FETCH_INSTANCE_COUNT_SUCCESS:
      return count;
    default:
      return state;
  }
};
export default instanceCount;

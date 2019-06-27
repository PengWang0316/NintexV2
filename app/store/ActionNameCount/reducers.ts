import { FETCH_ACTION_NAME_COUNT_SUCCESS, ActionnameCount, FetchActionNameCountType } from './types';

const actionNameCount = (
  state: ActionnameCount = { isFetched: false, data: [] },
  { type, actionNameCount: count }: FetchActionNameCountType,
): ActionnameCount => {
  switch (type) {
    case FETCH_ACTION_NAME_COUNT_SUCCESS:
      return { isFetched: true, data: count };
    default:
      return state;
  }
};
export default actionNameCount;

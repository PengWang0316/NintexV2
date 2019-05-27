import { FETCH_WORKFLOW_USE_COUNT_SUCCESS } from '../actions/ActionTypes';

const workflowUseCount = (
  state = { isFetched: false, data: [] }, { type, workflowUseCount: count },
) => {
  switch (type) {
    case FETCH_WORKFLOW_USE_COUNT_SUCCESS:
      return { isFetched: true, data: count };
    default:
      return state;
  }
};
export default workflowUseCount;

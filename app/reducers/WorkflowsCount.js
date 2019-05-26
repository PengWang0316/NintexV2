import { FETCH_WORKFLOWS_COUNT_SUCCESS } from '../actions/ActionTypes';

const workflowsCount = (state = null, { type, workflowsCount: count }) => {
  switch (type) {
    case FETCH_WORKFLOWS_COUNT_SUCCESS:
      return count;
    default:
      return state;
  }
};
export default workflowsCount;

import { FETCH_WORKFLOW_COUNT_SUCCESS } from '../actions/ActionTypes';

const workflowCount = (state = null, { type, workflowCount: count }) => {
  switch (type) {
    case FETCH_WORKFLOW_COUNT_SUCCESS:
      return count;
    default:
      return state;
  }
};
export default workflowCount;

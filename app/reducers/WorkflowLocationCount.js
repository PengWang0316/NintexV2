import { FETCH_WORKFLOW_LOCATION_COUNT_SUCCESS } from '../actions/ActionTypes';

const workflowLocationCount = (
  state = { isFetched: false, data: [] }, { type, workflowLocationCount: count },
) => {
  switch (type) {
    case FETCH_WORKFLOW_LOCATION_COUNT_SUCCESS:
      return { isFetched: true, data: count };
    default:
      return state;
  }
};
export default workflowLocationCount;

import { FETCH_WORKFLOWS_BY_USER_SUCCESS } from '../actions/ActionTypes';

const workflows = (
  state = { isFetched: false, data: [] }, { type, workflows: workflowsByUser },
) => {
  switch (type) {
    case FETCH_WORKFLOWS_BY_USER_SUCCESS:
      return { isFetched: true, data: workflowsByUser };
    default:
      return state;
  }
};
export default workflows;

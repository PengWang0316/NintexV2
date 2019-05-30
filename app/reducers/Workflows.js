import { FETCH_WORKFLOWS_BY_USER_SUCCESS } from '../actions/ActionTypes';

const workflows = (
  state = { isFetched: false, data: {} }, { type, workflows: workflowsByUser },
) => {
  switch (type) {
    case FETCH_WORKFLOWS_BY_USER_SUCCESS: {
      const workflowsObj = {};
      workflowsByUser.forEach((workflow) => {
        workflowsObj[workflow.workflowId] = workflow;
      });
      return { isFetched: true, data: workflowsObj };
    }
    default:
      return state;
  }
};
export default workflows;

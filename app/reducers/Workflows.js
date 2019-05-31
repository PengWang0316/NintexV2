import { FETCH_WORKFLOWS_BY_USER_SUCCESS, UPDATE_TAG_FROM_WORKFLOW_SUCCESS } from '../actions/ActionTypes';

const workflows = (
  state = { isFetched: false, data: {} }, {
    type, workflows: workflowsByUser, workflowId, tagIds,
  },
) => {
  switch (type) {
    case FETCH_WORKFLOWS_BY_USER_SUCCESS: {
      const workflowsObj = {};
      workflowsByUser.forEach((workflow) => {
        workflowsObj[workflow.workflowId] = workflow;
      });
      return { isFetched: true, data: workflowsObj };
    }
    case UPDATE_TAG_FROM_WORKFLOW_SUCCESS: {
      const workflowsObj = { ...state };
      workflowsObj.data[workflowId].tags = tagIds;
      return workflowsObj;
    }
    default:
      return state;
  }
};
export default workflows;

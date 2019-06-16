import {
  FETCH_WORKFLOWS_BY_USER_SUCCESS, UPDATE_TAG_FROM_WORKFLOW_SUCCESS,
  APPEND_WORKFLOWS_SUCCESS, UPDATE_WORKFLOW_ACTIVE_SUCCESS,
} from '../actions/ActionTypes';

const workflows = (
  state = { isFetched: false, data: {} }, {
    type, workflows: workflowsByUser, workflowId, tagIds, isActive,
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
    case APPEND_WORKFLOWS_SUCCESS:
      return { isFetched: true, data: { ...state.data, ...workflowsByUser } };
    case UPDATE_WORKFLOW_ACTIVE_SUCCESS:
      return { isFetched: true, data: { ...state.data, [workflowId]: { ...state.data[workflowId], isActive } } };
    default:
      return state;
  }
};
export default workflows;

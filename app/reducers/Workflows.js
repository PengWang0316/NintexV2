import { FETCH_WORKFLOWS_BY_USER_SUCCESS, REMOVE_TAG_FROM_WORKFLOW_SUCCESS } from '../actions/ActionTypes';

const workflows = (
  state = { isFetched: false, data: {} }, {
    type, workflows: workflowsByUser, workflowId, tagId,
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
    case REMOVE_TAG_FROM_WORKFLOW_SUCCESS: {
      const workflowsObj = { isFetched: true, data: { ...state.data } };
      workflowsObj.data[workflowId].tags = workflowsObj.data[workflowId].tags.split(',').filter(item => item !== tagId).join(',');
      return workflowsObj;
    }
    default:
      return state;
  }
};
export default workflows;

import {
  FETCH_WORKFLOWS_BY_USER_SUCCESS, UPDATE_TAG_FROM_WORKFLOW_SUCCESS,
  APPEND_WORKFLOWS_SUCCESS, UPDATE_WORKFLOW_ACTIVE_SUCCESS, SWITCH_MONITOR_SUCCESS,
  WorkflowsActionType, Workflows,
} from './types';

const workflows = (
  state: Workflows = { isFetched: false, data: {} },
  {
    type, workflows: workflowsByUser, workflowId, tagIds, isActive, isMonitored, formatedWorkflows,
  }: WorkflowsActionType,
): Workflows => {
  switch (type) {
    case FETCH_WORKFLOWS_BY_USER_SUCCESS: {
      const workflowsObj = {};
      workflowsByUser.forEach((workflow) => {
        workflowsObj[workflow.workflowId] = workflow;
      });
      return { isFetched: true, data: workflowsObj };
    }
    case UPDATE_TAG_FROM_WORKFLOW_SUCCESS: {
      const newWorkflows = { isFetched: state.isFetched, data: {} };
      Object.keys(state.data).forEach((key: string) => {
        if (key === workflowId) newWorkflows.data[key] = { ...state.data[key], tags: tagIds };
        else newWorkflows.data[key] = { ...state.data[key] };
      });
      return newWorkflows;
    }
    case APPEND_WORKFLOWS_SUCCESS:
      return { isFetched: true, data: { ...state.data, ...formatedWorkflows } };
    case UPDATE_WORKFLOW_ACTIVE_SUCCESS:
      return { isFetched: true, data: { ...state.data, [workflowId]: { ...state.data[workflowId], isActive } } };
    case SWITCH_MONITOR_SUCCESS:
      return { isFetched: true, data: { ...state.data, [workflowId]: { ...state.data[workflowId], isMonitored } } };
    default:
      return state;
  }
};
export default workflows;

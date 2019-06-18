import { FETCH_MONITOR_LIST_SUCCESS, SWITCH_MONITOR_SUCCESS } from '../actions/ActionTypes';

const MonitorList = (state = { isFetched: false, data: {} }, {
  type, workflows, workflowId, tenant,
}) => {
  switch (type) {
    case FETCH_MONITOR_LIST_SUCCESS: {
      const monitorList = { isFetched: true, data: {} };
      workflows.forEach((workflow) => {
        if (workflow.isMonitored && workflow.isMonitored === 1) monitorList.data[workflow.workflowId] = workflow.tenant;
      });
      return monitorList;
    }
    case SWITCH_MONITOR_SUCCESS: {
      const monitorList = { isFetched: true, data: { ...state.data } };
      if (monitorList.data[workflowId]) delete monitorList.data[workflowId];
      else monitorList.data[workflowId] = tenant;
      return monitorList;
    }
    default:
      return state;
  }
};
export default MonitorList;

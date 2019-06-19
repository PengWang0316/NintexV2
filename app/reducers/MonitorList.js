import { FETCH_MONITOR_LIST_SUCCESS, SWITCH_MONITOR_SUCCESS } from '../actions/ActionTypes';

const MonitorList = (state = { isFetched: false, data: {} }, {
  type, workflows, workflowId, tenant, key,
}) => {
  switch (type) {
    case FETCH_MONITOR_LIST_SUCCESS: { // Since this stat is presisted, this case should just be called once at a user first login
      const monitorList = { isFetched: true, data: {} };
      // The
      workflows.forEach((workflow) => {
        if (workflow.isMonitored && workflow.isMonitored === 1) {
          monitorList.data[workflow.workflowId] = {
            tenant: workflow.tenant,
            instances: {},
            hasFailure: false,
          };
        }
      });
      return monitorList;
    }
    case SWITCH_MONITOR_SUCCESS: {
      const monitorList = { isFetched: true, data: { ...state.data } };
      if (monitorList.data[workflowId]) delete monitorList.data[workflowId];
      else {
        monitorList.data[workflowId] = {
          tenant,
          key,
          instances: {},
          hasFailure: false,
        };
      }
      return monitorList;
    }
    default:
      return state;
  }
};
export default MonitorList;

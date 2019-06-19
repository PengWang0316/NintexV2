/* eslint-disable no-plusplus */
import { FETCH_MONITOR_LIST_SUCCESS, SWITCH_MONITOR_SUCCESS, UPDATE_INSTANCES_SUCCESS } from '../actions/ActionTypes';

const MAX_INSTANCE_AMOUNT = 3;

const MonitorList = (state = { isFetched: false, data: {} }, {
  type, workflows, workflowId, tenant, key, instances,
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
    case UPDATE_INSTANCES_SUCCESS: {
      const monitorList = { isFetched: true, data: { ...state.data, [workflowId]: { ...state.data[workflowId], instances: {} } } };
      let hasFailure = false;
      // Maximum keep 3 instances
      for (let i = 0, { length } = instances; i < length && i < MAX_INSTANCE_AMOUNT; i++) {
        const {
          instanceId, startDateTime, endDateTime, status,
        } = instances[i];
        monitorList.data[workflowId].instances[instanceId] = {
          startTime: startDateTime,
          endTime: endDateTime,
          status,
        };
        if (status === 'Failed') hasFailure = true;
      }
      monitorList.data[workflowId].hasFailure = hasFailure;
      return monitorList;
    }
    default:
      return state;
  }
};
export default MonitorList;

import {
  FETCH_MONITOR_LIST_SUCCESS, SWITCH_MONITOR_SUCCESS, UPDATE_INSTANCES_SUCCESS,
  MonitorListType, MonitorListActionDataType,
} from './types';
import { MAXIMUM_CHECK_INSTANCE_AMOUNT } from '../../config';

const MonitorList = (
  state: MonitorListType = { isFetched: false, data: {} },
  {
    type, workflows, workflowId, tenant, key, instances, isMonitored,
  }: MonitorListActionDataType,
): MonitorListType => {
  switch (type) {
    // Since this stat is presisted, this case should just be called once at a user first login
    case FETCH_MONITOR_LIST_SUCCESS: {
      const monitorList = { isFetched: true, data: {} };
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
      const monitorList: MonitorListType = { isFetched: true, data: { ...state.data } };
      if (isMonitored === 0 && monitorList.data[workflowId]) delete monitorList.data[workflowId];
      else if (isMonitored === 1) {
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
      const monitorList: MonitorListType = {
        isFetched: true,
        data: { ...state.data, [workflowId]: { ...state.data[workflowId], instances: {} } },
      };
      let hasFailure = false;
      // Maximum keep 3 instances
      for (
        let i = 0, { length } = instances; i < length && i < MAXIMUM_CHECK_INSTANCE_AMOUNT; i++
      ) {
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

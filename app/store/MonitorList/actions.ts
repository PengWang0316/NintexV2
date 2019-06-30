/* eslint-disable no-plusplus */
import axios from 'axios';

import { SWITCH_MONITOR_SUCCESS, UPDATE_INSTANCES_SUCCESS, MonitorListData } from './types';
import { UPDATE_NWC_ISMONITORED_API, NWC_LIST_WORKFLOWS_API, IMPORT_MONITOR_WORKFLOWS_API } from '../Urls';
import { BEARER_HEADER, MAXIMUM_CHECK_INSTANCE_AMOUNT } from '../../config';
import getJwtToken from '../libs/GetJWTToken';

const switchMonitorSuccess = (
  workflowId: string, tenant: string, isMonitored: number, key: string,
) => ({
  type: SWITCH_MONITOR_SUCCESS,
  workflowId,
  tenant,
  isMonitored,
  key,
});

const updateInstancesSuccess = (workflowId, instances) => ({
  type: UPDATE_INSTANCES_SUCCESS,
  workflowId,
  instances,
});

export const switchMonitor = (
  workflowId: string, tenant: string, isMonitored: number, key: string,
) => async (dispatch) => {
  dispatch(switchMonitorSuccess(workflowId, tenant, isMonitored, key));
  axios.put(UPDATE_NWC_ISMONITORED_API, { workflowId, isMonitored }, { headers: { Authorization: getJwtToken(), 'Content-Type': 'application/json' } });
};

// This function is in charge of comparing whether new instances
// has different status with previous instances.
// An export and import call will be made if any change occure.
const compareStatus = async (monitoredWorkflows: MonitorListData, result) => {
  const apiCallArray = [];
  const importInstances = {};
  // Compare each instance with old status
  result.forEach(({ config: { params: { workflowId } }, data: { instances } }) => {
    if (instances.length !== 0) {
      let newFailure = false;
      const { instanceId, workflow: { name: workflowName } } = instances[0];
      // Get the status from new result
      for (let i = 0, { length } = instances; i < length && i < MAXIMUM_CHECK_INSTANCE_AMOUNT; i++) {
        if (instances[i].status === 'Failed') newFailure = true;
      }

      if ((!monitoredWorkflows[workflowId] && newFailure === true)
          || (!monitoredWorkflows[workflowId].hasFailure && newFailure)) {
        // new failure occures
        apiCallArray.push(axios.post(`${NWC_LIST_WORKFLOWS_API}/${workflowId}/draft/export`, { workflowId }, { headers: { authorization: `${BEARER_HEADER} ${monitoredWorkflows[workflowId].key}` } }));
        importInstances[workflowId] = { name: `${workflowName} - EM${instanceId.substring(0, 8)}` };
      } else if (monitoredWorkflows[workflowId].hasFailure && !newFailure) {
      // Has failure before and no failure now
        apiCallArray.push(axios.post(`${NWC_LIST_WORKFLOWS_API}/${workflowId}/draft/export`, { workflowId }, { headers: { authorization: `${BEARER_HEADER} ${monitoredWorkflows[workflowId].key}` } }));
        importInstances[workflowId] = { name: `${workflowName} - CM${instanceId.substring(0, 8)}` };
      }
    }
  });

  if (apiCallArray.length !== 0) {
    const callResults = await axios.all(apiCallArray);
    // put export keys to the importInstances
    callResults.forEach(({ config: { data: post }, data: { key } }) => {
      const { workflowId: currentWorkflowId } = JSON.parse(post);
      importInstances[currentWorkflowId].key = key;
    });
    axios.post(IMPORT_MONITOR_WORKFLOWS_API, { importInstances: Object.values(importInstances) }, { headers: { Authorization: getJwtToken(), 'Content-Type': 'application/json' } });
  }
};

export const checkInstanceStatus = (monitoredWorkflows: MonitorListData) => async (dispatch) => {
  const fetchInstanceArray = Object.keys(monitoredWorkflows)
    .map(id => axios.get(
      `${NWC_LIST_WORKFLOWS_API}/${id}/instances`,
      { params: { workflowId: id }, headers: { authorization: `${BEARER_HEADER} ${monitoredWorkflows[id].key}` } },
    ));
  const result = await axios.all(fetchInstanceArray);
  compareStatus(monitoredWorkflows, result);
  result.forEach((
    { config: { params: { workflowId } }, data: { instances } },
  ) => dispatch(updateInstancesSuccess(workflowId, instances)));
};

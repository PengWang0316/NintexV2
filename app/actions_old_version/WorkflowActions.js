/* eslint-disable no-plusplus */
import axios from 'axios';
import { Auth } from 'aws-amplify';

import {
  POST_WORKFLOWS_API, GET_WORKFLOWS_COUNT_API, UPDATE_TAG_FROM_WORKFLOW_API,
  GET_WORKFLOWS_LOCATION_COUNT_API, GET_WORKFLOWS_BY_USER_API, NWC_LIST_WORKFLOWS_API,
  UPDATE_NWC_ACTIVE_API, UPDATE_NWC_ISMONITORED_API,
} from './Urls';
import {
  FETCH_WORKFLOW_COUNT_SUCCESS, FETCH_WORKFLOW_LOCATION_COUNT_SUCCESS,
  FETCH_WORKFLOWS_BY_USER_SUCCESS, UPDATE_TAG_FROM_WORKFLOW_SUCCESS, SWITCH_MONITOR_SUCCESS,
  APPEND_WORKFLOWS_SUCCESS, UPDATE_WORKFLOW_ACTIVE_SUCCESS, FETCH_MONITOR_LIST_SUCCESS,
} from './ActionTypes';
import removeCommaAndQuote from './libs/RemoveCommaAndQuote';
import getTokenAndData from './libs/GetTokenAndData';
import { BEARER_HEADER } from '../config';

// Set a batch size to send the payload parallely
const BATCH_SIZE = 500;

const fetchWorkflowCountSuccess = workflowCount => ({
  type: FETCH_WORKFLOW_COUNT_SUCCESS,
  workflowCount,
});

const fetchWorkflowLocationCountSuccess = workflowLocationCount => ({
  type: FETCH_WORKFLOW_LOCATION_COUNT_SUCCESS,
  workflowLocationCount,
});

const fetchWorkflowsByUserSuccess = workflows => ({
  type: FETCH_WORKFLOWS_BY_USER_SUCCESS,
  workflows,
});

const fetchMonitorListSuccess = workflows => ({
  type: FETCH_MONITOR_LIST_SUCCESS,
  workflows,
});

const updateTagFromWorkflowSuccess = (workflowId, tagIds) => ({
  type: UPDATE_TAG_FROM_WORKFLOW_SUCCESS,
  workflowId,
  tagIds,
});

const changeWorkflowActiveSuccess = (workflowId, isActive) => ({
  type: UPDATE_WORKFLOW_ACTIVE_SUCCESS,
  workflowId,
  isActive,
});

const switchMonitorSuccess = (workflowId, tenant, isMonitored, key) => ({
  type: SWITCH_MONITOR_SUCCESS,
  workflowId,
  tenant,
  isMonitored,
  key,
});

export const appandWorkflows = workflows => ({
  type: APPEND_WORKFLOWS_SUCCESS,
  workflows,
});

export const uploadWorkflows = async (text) => {
  const [dataArray, jwtToken] = await getTokenAndData(text);
  let workflows = [];

  for (let i = 7, { length } = dataArray; i < length; i++) {
    if (dataArray[i] !== '') {
      const workflow = [];
      const tempArr = removeCommaAndQuote(dataArray[i]).split(',');
      tempArr.forEach((item, index) => {
        // Concat 17 and 18 for the SlicerDate
        if (index === 17) {
          try { // prevent the date format error in the source CSV file
            workflow.push(new Date(item).toISOString());
          } catch (err) {
            console.warn(err);
            console.log(dataArray[i]);
          }
        } else if (index === 21) {
          // The source data use a day/month/year format
          const [day, month, year] = item.split('/');
          workflow.push(new Date(year, month - 1, day).toISOString());
        } else workflow.push(item);
      });
      if (workflow.length === 25) workflows.push(workflow);
      if (workflows.length === BATCH_SIZE) {
        axios.post(POST_WORKFLOWS_API, { workflows }, { headers: { Authorization: jwtToken, 'Content-Type': 'application/json' } });
        workflows = [];
      }
    }
  }
  if (workflows.length !== 0) axios.post(POST_WORKFLOWS_API, { workflows }, { headers: { Authorization: jwtToken, 'Content-Type': 'application/json' } });
};

export const fetchWorkflowCount = () => async (dispatch) => {
  const { idToken: { jwtToken } } = await Auth.currentSession();
  const { data: { count } } = await axios.get(GET_WORKFLOWS_COUNT_API, { headers: { Authorization: jwtToken, 'Content-Type': 'application/json' } });
  dispatch(fetchWorkflowCountSuccess(count));
};

export const fetchWorkflowLocationCount = () => async (dispatch) => {
  const { idToken: { jwtToken } } = await Auth.currentSession();
  const { data } = await axios.get(GET_WORKFLOWS_LOCATION_COUNT_API, { headers: { Authorization: jwtToken, 'Content-Type': 'application/json' } });
  dispatch(fetchWorkflowLocationCountSuccess(data));
};

export const fetchWorkflowsByUser = () => async (dispatch) => {
  const { idToken: { jwtToken } } = await Auth.currentSession();
  const { data } = await axios.get(GET_WORKFLOWS_BY_USER_API, { headers: { Authorization: jwtToken, 'Content-Type': 'application/json' } });
  dispatch(fetchWorkflowsByUserSuccess(data));
  // dispatch(fetchMonitorListSuccess(data));
};

export const updateTagFromWorkflow = (workflowId, tagIds) => async (dispatch) => {
  const { idToken: { jwtToken } } = await Auth.currentSession();
  // In the future, we may consider to wait the backend result and handle the potential failures.
  axios.put(UPDATE_TAG_FROM_WORKFLOW_API, { tags: tagIds, id: workflowId }, { headers: { Authorization: jwtToken, 'Content-Type': 'application/json' } });
  dispatch(updateTagFromWorkflowSuccess(workflowId, tagIds));
};

export const runWorkflow = (workflowId, key) => async (dispatch) => {
  const { idToken: { jwtToken } } = await Auth.currentSession();
  // Somehow, the NWC server gives error to some workflow id.
  // Keeping the NWC post call first can help to prevent updating our database when activating fails.
  await axios.post(
    `${NWC_LIST_WORKFLOWS_API}/${workflowId}/activate`,
    {},
    {
      headers: { authorization: `${BEARER_HEADER} ${key}` },
    },
  );
  axios.put(UPDATE_NWC_ACTIVE_API, { workflowId, isActive: 1 }, { headers: { Authorization: jwtToken, 'Content-Type': 'application/json' } });
  dispatch(changeWorkflowActiveSuccess(workflowId, 1));
};

export const stopWorkflow = (workflowId, key) => async (dispatch) => {
  const { idToken: { jwtToken } } = await Auth.currentSession();
  // Somehow, the NWC server gives error to some workflow id.
  // Keeping the NWC post call first can help to prevent updating our database when activating fails.
  await axios.post(
    `${NWC_LIST_WORKFLOWS_API}/${workflowId}/deactivate`,
    {},
    {
      headers: { authorization: `${BEARER_HEADER} ${key}` },
    },
  );
  axios.put(UPDATE_NWC_ACTIVE_API, { workflowId, isActive: 0 }, { headers: { Authorization: jwtToken, 'Content-Type': 'application/json' } });
  dispatch(changeWorkflowActiveSuccess(workflowId, 0));
};

export const switchMonitor = (workflowId, tenant, isMonitored, key) => async (dispatch) => {
  const { idToken: { jwtToken } } = await Auth.currentSession();
  dispatch(switchMonitorSuccess(workflowId, tenant, isMonitored, key));
  axios.put(UPDATE_NWC_ISMONITORED_API, { workflowId, isMonitored }, { headers: { Authorization: jwtToken, 'Content-Type': 'application/json' } });
};

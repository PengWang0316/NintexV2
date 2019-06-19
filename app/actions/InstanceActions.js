/* eslint-disable no-plusplus */
import axios from 'axios';
import { Auth } from 'aws-amplify';

import {
  POST_INSTANCES_API, GET_INSTANCE_COUNT_API, GET_INSTANCE_STATUS_API,
  GET_INSTANCE_STATUS_BYTIME_API,
} from './Urls';
import { NWC_LIST_WORKFLOWS_API, BEARER_HEADER } from '../config';
import {
  FETCH_INSTANCE_COUNT_SUCCESS, FETCH_INSTANCE_STATUS_SUCCESS,
  FETCH_INSTANCE_STATUS_BYTIME_SUCCESS, UPDATE_INSTANCES_SUCCESS,
} from './ActionTypes';
import removeCommaAndQuote from './libs/RemoveCommaAndQuote';
import getTokenAndData from './libs/GetTokenAndData';

// Set a batch size to send the payload parallely
const BATCH_SIZE = 500;

const fetchInstanceCountSuccess = instanceCount => ({
  type: FETCH_INSTANCE_COUNT_SUCCESS,
  instanceCount,
});

const fetchInstanceStatusSuccess = instanceStatus => ({
  type: FETCH_INSTANCE_STATUS_SUCCESS,
  instanceStatus,
});

const fetchInstanceStatusByTimeSuccess = instanceStatus => ({
  type: FETCH_INSTANCE_STATUS_BYTIME_SUCCESS,
  instanceStatus,
});

const updateInstancesSuccess = (workflowId, instances) => ({
  type: UPDATE_INSTANCES_SUCCESS,
  workflowId,
  instances,
});

export const uploadInstances = async (text) => {
  const [dataArray, jwtToken] = await getTokenAndData(text);
  let instances = [];

  for (let i = 8, { length } = dataArray; i < length; i++) {
    if (dataArray[i] !== '') {
      const instance = [];
      const tempArr = removeCommaAndQuote(dataArray[i]).split(',');
      tempArr.forEach((item, index) => {
        // Concat 0 and 1 for the StatusDate
        if (index === 0) {
          try { // prevent the date format error in the source CSV file
            instance.push(new Date(item).toISOString());
          } catch (err) {
            console.warn(err);
            console.log(dataArray[i]);
          }
        } else instance.push(item);
      });
      if (instance.length === 10) instances.push(instance);
      if (instances.length === BATCH_SIZE) {
        axios.post(POST_INSTANCES_API, { instances }, { headers: { Authorization: jwtToken, 'Content-Type': 'application/json' } });
        instances = [];
      }
    }
  }
  if (instances.length !== 0) axios.post(POST_INSTANCES_API, { instances }, { headers: { Authorization: jwtToken, 'Content-Type': 'application/json' } });
};

export const fetchInstanceCount = () => async (dispatch) => {
  const { idToken: { jwtToken } } = await Auth.currentSession();
  const { data: { count } } = await axios.get(GET_INSTANCE_COUNT_API, { headers: { Authorization: jwtToken, 'Content-Type': 'application/json' } });
  dispatch(fetchInstanceCountSuccess(count));
};

export const fetchInstanceStatus = () => async (dispatch) => {
  const { idToken: { jwtToken } } = await Auth.currentSession();
  const { data } = await axios.get(GET_INSTANCE_STATUS_API, { headers: { Authorization: jwtToken, 'Content-Type': 'application/json' } });
  dispatch(fetchInstanceStatusSuccess(data));
};

export const fetchInstanceStatusByTime = () => async (dispatch) => {
  const { idToken: { jwtToken } } = await Auth.currentSession();
  const { data } = await axios.get(GET_INSTANCE_STATUS_BYTIME_API, { headers: { Authorization: jwtToken, 'Content-Type': 'application/json' } });
  dispatch(fetchInstanceStatusByTimeSuccess(data));
};

export const checkInstanceStatus = monitoredWorkflows => async (dispatch) => {
  const fetchInstanceArray = Object.keys(monitoredWorkflows)
    .map(id => axios.get(
      `${NWC_LIST_WORKFLOWS_API}/${id}/instances`,
      { params: { workflowId: id }, headers: { authorization: `${BEARER_HEADER} ${monitoredWorkflows[id].key}` } },
    ));
  const result = await axios.all(fetchInstanceArray);
  // console.log(result);
  result.forEach(({ config: { params: { workflowId } }, data: { instances } }) => dispatch(updateInstancesSuccess(workflowId, instances)));
};

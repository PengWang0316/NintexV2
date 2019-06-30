/* eslint-disable no-plusplus */
import axios from 'axios';
import { Auth } from 'aws-amplify';

import {
  POST_ACTIONS_API, GET_PUBLISHER_COUNT_API, GET_WORKFLOW_USE_COUNT_API,
  GET_TOP_PUBLISHERS_COUNT_API, GET_ACTION_NAME_COUNT_API,
} from './Urls';
import {
  FETCH_PUBLISHER_COUNT_SUCCESS, FETCH_TOP_PUBLISHERS_COUNT_SUCCESS,
  FETCH_ACTION_NAME_COUNT_SUCCESS, FETCH_WORKFLOW_USE_COUNT_SUCCESS,
} from './ActionTypes';
import removeCommaAndQuote from './libs/RemoveCommaAndQuote';
import getTokenAndData from './libs/GetTokenAndData';

// Set a batch size to send the payload parallely
const BATCH_SIZE = 500;

const fetchPublisherCountSuccess = publisherCount => ({
  type: FETCH_PUBLISHER_COUNT_SUCCESS,
  publisherCount,
});

const fetchTopPublishersCountSuccess = topPublishersCount => ({
  type: FETCH_TOP_PUBLISHERS_COUNT_SUCCESS,
  topPublishersCount,
});

const fetchActionNameCountSuccess = actionNameCount => ({
  type: FETCH_ACTION_NAME_COUNT_SUCCESS,
  actionNameCount,
});

const fetchWorkflowUseCountSuccess = workflowUseCount => ({
  type: FETCH_WORKFLOW_USE_COUNT_SUCCESS,
  workflowUseCount,
});

export const uploadActions = async (text) => {
  const [dataArray, jwtToken] = await getTokenAndData(text);
  let actions = [];
  for (let i = 7, { length } = dataArray; i < length; i++) {
    if (dataArray[i] !== '') {
      const action = [];
      const tempArr = removeCommaAndQuote(dataArray[i]).split(',');
      tempArr.forEach((item, index) => {
        if (index === 6) {
          try { // prevent the date format error in the source CSV file
            action.push(new Date(item).toISOString());
          } catch (err) {
            console.warn(err);
            console.log(dataArray[i]);
          }
        } else action.push(item);
      });
      if (action.length === 26) actions.push(action);
      if (actions.length === BATCH_SIZE) {
        axios.post(POST_ACTIONS_API, { actions }, { headers: { Authorization: jwtToken, 'Content-Type': 'application/json' } });
        actions = [];
      }
    }
  }
  if (actions.length !== 0) axios.post(POST_ACTIONS_API, { actions }, { headers: { Authorization: jwtToken, 'Content-Type': 'application/json' } });
};

export const fetchPublisherCount = () => async (dispatch) => {
  const { idToken: { jwtToken } } = await Auth.currentSession();
  const { data: { count } } = await axios.get(GET_PUBLISHER_COUNT_API, { headers: { Authorization: jwtToken, 'Content-Type': 'application/json' } });
  dispatch(fetchPublisherCountSuccess(count));
};

export const fetchTopPublishersCount = () => async (dispatch) => {
  const { idToken: { jwtToken } } = await Auth.currentSession();
  const { data } = await axios.get(GET_TOP_PUBLISHERS_COUNT_API, { headers: { Authorization: jwtToken, 'Content-Type': 'application/json' } });
  dispatch(fetchTopPublishersCountSuccess(data));
};

export const fetchActionNameCount = () => async (dispatch) => {
  const { idToken: { jwtToken } } = await Auth.currentSession();
  const { data } = await axios.get(GET_ACTION_NAME_COUNT_API, { headers: { Authorization: jwtToken, 'Content-Type': 'application/json' } });
  dispatch(fetchActionNameCountSuccess(data));
};

export const fetchWorkflowUseCount = () => async (dispatch) => {
  const { idToken: { jwtToken } } = await Auth.currentSession();
  const { data } = await axios.get(GET_WORKFLOW_USE_COUNT_API, { headers: { Authorization: jwtToken, 'Content-Type': 'application/json' } });
  dispatch(fetchWorkflowUseCountSuccess(data));
};

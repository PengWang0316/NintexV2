/* eslint-disable no-plusplus */
import axios from 'axios';
import { Auth } from 'aws-amplify';

import {
  POST_WORKFLOWS_API, GET_WORKFLOWS_COUNT_API, GET_WORKFLOWS_LOCATION_COUNT_API,
} from './Urls';
import { FETCH_WORKFLOW_COUNT_SUCCESS, FETCH_WORKFLOW_LOCATION_COUNT_SUCCESS } from './ActionTypes';
import removeCommaAndQuote from './libs/RemoveCommaAndQuote';
import getTokenAndData from './libs/GetTokenAndData';

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

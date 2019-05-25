/* eslint-disable no-plusplus */
import axios from 'axios';
import { Auth } from 'aws-amplify';

import { POST_WORKFLOWS_API, POST_INSTANCES_API } from './Urls';

// Set a batch size to send the payload parallely
const BATCH_SIZE = 500;
// const REMOVE_COMMA_REGEXP = /(".*?),(.*?")/g;
const FIND_COMMA_REGEXP = /(".*?,.*?")/g;
const REMOVE_BRACKET_REGEXP = /[{}]/g;
const REMOVE_COMMAN_QUOTE_REGEXP = /[,"]/g;
// const REPLACE_DOUBLE_QUOTE_REGEXP = /".*?"".*?"".*?"/g;

const getTokenAndData = async (text) => {
  const { idToken: { jwtToken } } = await Auth.currentSession();
  const dataArray = text.replace(/\r/g, '\n')
    .replace(REMOVE_BRACKET_REGEXP, '').split(/\n/g);
  return [dataArray, jwtToken];
};

const removeCommaAndQuote = (text) => {
  // Replace double quote to a single comma first for more processing
  let newText = text.replace(/""/g, ',');
  // Remove quote and comma
  const result = newText.match(FIND_COMMA_REGEXP);
  if (result) {
    result.forEach((item) => {
      newText = newText.replace(item, item.replace(REMOVE_COMMAN_QUOTE_REGEXP, ''));
    });
  }
  return newText;
};

export const uploadWorkflows = async (text) => {
  const [dataArray, jwtToken] = await getTokenAndData(text);
  let workflows = [];

  for (let i = 7, { length } = dataArray; i < length; i++) {
    if (dataArray[i] !== '') {
      const workflow = [];
      const tempArr = dataArray[i].split(',');
      tempArr.forEach((item, index) => {
        // Concat 17 and 18 for the SlicerDate
        if (index === 17) workflow.push(new Date(`${item},${tempArr[18]}`).toISOString());
        else if (index === 22) {
          // The source data use a day/month/year format
          const [day, month, year] = item.split('/');
          workflow.push(new Date(year, month - 1, day).toISOString());
        } else if (index === 3 || index === 7 || index === 8) {
          // Remove { and } from the string
          workflow.push(item && item !== '' ? item.slice(1, item.length - 1) : item);
        } else if (index !== 18) workflow.push(item);
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

export const uploadActions = async (text) => {
  const [dataArray, jwtToken] = await getTokenAndData(text);
  let actions = [];
  // console.log(dataArray);
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
        axios.post(POST_INSTANCES_API, { actions }, { headers: { Authorization: jwtToken, 'Content-Type': 'application/json' } });
        actions = [];
      }
    }
  }
  if (actions.length !== 0) axios.post(POST_INSTANCES_API, { actions }, { headers: { Authorization: jwtToken, 'Content-Type': 'application/json' } });
};

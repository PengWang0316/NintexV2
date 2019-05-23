import axios from 'axios';
import { Auth } from 'aws-amplify';

import { POST_WORKFLOWS_API } from './Urls';

// Set a batch size to send the payload parallely
const BATCH_SIZE = 500;

export const uploadWorkflows = async (text) => {
  const { idToken: { jwtToken } } = await Auth.currentSession();
  const workflowArray = text.replace(/\r/g, '\n').split(/\n/g);
  let workflows = [];

  for (let i = 7, { length } = workflowArray; i < length; i++) {
    if (workflowArray[i] !== '') {
      const workflow = [];
      const tempArr = workflowArray[i].split(',');
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

export const uploadInstances = (text) => {

};

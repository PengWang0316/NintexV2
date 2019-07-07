/* eslint-disable no-plusplus */
import axios from 'axios';

import { POST_WORKFLOWS_API } from '../store/Urls';

import removeCommaAndQuote from './libs/RemoveCommaAndQuote';
import getTokenAndData from './libs/GetTokenAndData';

// Set a batch size to send the payload parallely
const BATCH_SIZE = 500;

export const uploadWorkflows = async (text: string) => {
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
          workflow.push(new Date(+year, +month - 1, +day).toISOString());
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
export default uploadWorkflows;

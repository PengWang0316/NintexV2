/* eslint-disable no-plusplus */
import axios from 'axios';

import { POST_INSTANCES_API } from './Urls';
import removeCommaAndQuote from './libs/RemoveCommaAndQuote';
import getTokenAndData from './libs/GetTokenAndData';

// Set a batch size to send the payload parallely
const BATCH_SIZE = 500;

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

export default uploadInstances;

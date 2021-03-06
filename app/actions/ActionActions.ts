/* eslint-disable no-plusplus */
import axios from 'axios';

import { POST_ACTIONS_API } from '../store/Urls';

import removeCommaAndQuote from './libs/RemoveCommaAndQuote';
import getTokenAndData from './libs/GetTokenAndData';

// Set a batch size to send the payload parallely
const BATCH_SIZE = 500;

export const uploadActions = async (text: string) => {
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
export default uploadActions;

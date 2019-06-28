import axios from 'axios';
import { Auth } from 'aws-amplify';

import { FETCH_PUBLISHER_COUNT_SUCCESS, OfficeKeyActionType } from './types';
import { GET_PUBLISHER_COUNT_API } from '../Urls';

const fetchPublisherCountSuccess = (publisherCount: number): OfficeKeyActionType => ({
  type: FETCH_PUBLISHER_COUNT_SUCCESS,
  publisherCount,
});

export const fetchPublisherCount = () => async (dispatch) => {
  const { idToken: { jwtToken } } = await Auth.currentSession() as any;
  const { data: { count } } = await axios.get(GET_PUBLISHER_COUNT_API, { headers: { Authorization: jwtToken, 'Content-Type': 'application/json' } });
  dispatch(fetchPublisherCountSuccess(count));
};
export default fetchPublisherCount;

import axios from 'axios';
import { Auth } from 'aws-amplify';

import { GET_INSTANCE_COUNT_API } from '../Urls';
import {
  FETCH_INSTANCE_COUNT_SUCCESS, FetchInstanceCountType,
} from './types';

const fetchInstanceCountSuccess = (instanceCount: number): FetchInstanceCountType => ({
  type: FETCH_INSTANCE_COUNT_SUCCESS,
  instanceCount,
});

export const fetchInstanceCount = () => async (dispatch) => {
  const { idToken: { jwtToken } } = await Auth.currentSession() as any;
  const { data: { count } } = await axios.get(GET_INSTANCE_COUNT_API, { headers: { Authorization: jwtToken, 'Content-Type': 'application/json' } });
  dispatch(fetchInstanceCountSuccess(count));
};

export default fetchInstanceCount;

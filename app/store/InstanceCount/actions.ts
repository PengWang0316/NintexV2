import axios from 'axios';

import { GET_INSTANCE_COUNT_API } from '../Urls';
import {
  FETCH_INSTANCE_COUNT_SUCCESS, FetchInstanceCountType,
} from './types';
import getJwtToken from '../libs/GetJWTToken';

const fetchInstanceCountSuccess = (instanceCount: number): FetchInstanceCountType => ({
  type: FETCH_INSTANCE_COUNT_SUCCESS,
  instanceCount,
});

export const fetchInstanceCount = () => async (dispatch) => {
  const { data: { count } } = await axios.get(GET_INSTANCE_COUNT_API, { headers: { Authorization: getJwtToken(), 'Content-Type': 'application/json' } });
  dispatch(fetchInstanceCountSuccess(count));
};

export default fetchInstanceCount;

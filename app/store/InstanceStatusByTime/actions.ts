import axios from 'axios';
import { Auth } from 'aws-amplify';

import { GET_INSTANCE_STATUS_BYTIME_API } from '../Urls';
import {
  FETCH_INSTANCE_STATUS_BYTIME_SUCCESS, FetchInstanceStatusByTimeType,
} from './types';
import { RawInstanceStatus } from '../InstanceStatus/types';

const fetchInstanceStatusByTimeSuccess = (
  instanceStatus: RawInstanceStatus[],
): FetchInstanceStatusByTimeType => ({
  type: FETCH_INSTANCE_STATUS_BYTIME_SUCCESS,
  instanceStatus,
});

export const fetchInstanceStatusByTime = () => async (dispatch) => {
  const { idToken: { jwtToken } } = await Auth.currentSession() as any;
  const { data } = await axios.get(GET_INSTANCE_STATUS_BYTIME_API, { headers: { Authorization: jwtToken, 'Content-Type': 'application/json' } });
  dispatch(fetchInstanceStatusByTimeSuccess(data));
};

export default fetchInstanceStatusByTime;

import axios from 'axios';

import { GET_INSTANCE_STATUS_API } from '../Urls';
import {
  FETCH_INSTANCE_STATUS_SUCCESS, RawInstanceStatus, FetchInstanceStatusType,
} from './types';
import getJwtToken from '../libs/GetJWTToken';

const fetchInstanceStatusSuccess = (
  instanceStatus: RawInstanceStatus,
): FetchInstanceStatusType => ({
  type: FETCH_INSTANCE_STATUS_SUCCESS,
  instanceStatus,
});

export const fetchInstanceStatus = () => async (dispatch) => {
  const { data } = await axios.get(GET_INSTANCE_STATUS_API, { headers: { Authorization: getJwtToken(), 'Content-Type': 'application/json' } });
  dispatch(fetchInstanceStatusSuccess(data));
};

export default fetchInstanceStatus;

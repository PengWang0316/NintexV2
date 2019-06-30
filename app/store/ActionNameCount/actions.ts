import axios from 'axios';

import { GET_ACTION_NAME_COUNT_API } from '../Urls';
import {
  FETCH_ACTION_NAME_COUNT_SUCCESS, FetchActionNameCountType, ActionNameCountDataType,
} from './types';
import getJwtToken from '../libs/GetJWTToken';

const fetchActionNameCountSuccess = (
  actionNameCount: ActionNameCountDataType,
): FetchActionNameCountType => ({
  type: FETCH_ACTION_NAME_COUNT_SUCCESS,
  actionNameCount,
});

export const fetchActionNameCount = () => async (dispatch) => {
  const { data } = await axios.get(GET_ACTION_NAME_COUNT_API, { headers: { Authorization: getJwtToken(), 'Content-Type': 'application/json' } });
  dispatch(fetchActionNameCountSuccess(data as ActionNameCountDataType));
};

export default fetchActionNameCount;

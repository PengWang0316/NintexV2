import axios from 'axios';
import { Auth } from 'aws-amplify';

import { GET_ACTION_NAME_COUNT_API } from '../Urls';
import {
  FETCH_ACTION_NAME_COUNT_SUCCESS, FetchActionNameCountType, ActionNameCountDataType,
} from './types';

const fetchActionNameCountSuccess = (
  actionNameCount: ActionNameCountDataType,
): FetchActionNameCountType => ({
  type: FETCH_ACTION_NAME_COUNT_SUCCESS,
  actionNameCount,
});

export const fetchActionNameCount = () => async (dispatch) => {
  const { idToken: { jwtToken } } = await Auth.currentSession() as any;
  const { data } = await axios.get(GET_ACTION_NAME_COUNT_API, { headers: { Authorization: jwtToken, 'Content-Type': 'application/json' } });
  dispatch(fetchActionNameCountSuccess(data as ActionNameCountDataType));
};

export default fetchActionNameCount;

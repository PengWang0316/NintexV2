import axios from 'axios';
import { Auth } from 'aws-amplify';

import {
  FETCH_NWCKEY_SUCCESS, ADD_NWCKEY_SUCCESS, DELETE_NWCKEY_SUCCESS,
  RawNWCApiKey,
} from './types';
import { FETCH_NWC_KEYS_API, ADD_NWC_KEY_API, DELETE_NWC_KEY_API } from '../Urls';

const fetchNwcKeySuccess = (keys: RawNWCApiKey[]) => ({
  type: FETCH_NWCKEY_SUCCESS,
  keys,
});

const addNwcKeySuccess = (tenant: string, key: string, id: number) => ({
  type: ADD_NWCKEY_SUCCESS,
  tenant,
  key,
  id,
});

const deleteNwcKeySuccess = (tenant: string) => ({
  type: DELETE_NWCKEY_SUCCESS,
  tenant,
});

export const fetchNwcKey = () => async (dispatch) => {
  const { idToken: { jwtToken } } = await Auth.currentSession() as any;
  const { data } = await axios.get(FETCH_NWC_KEYS_API, { headers: { Authorization: jwtToken, 'Content-Type': 'application/json' } });
  dispatch(fetchNwcKeySuccess(data));
};

export const addNwcKey = (tenant: string, key: string) => async (dispatch) => {
  const { idToken: { jwtToken } } = await Auth.currentSession() as any;
  const { data: id } = await axios.post(ADD_NWC_KEY_API, { tenant, key }, { headers: { Authorization: jwtToken, 'Content-Type': 'application/json' } });
  dispatch(addNwcKeySuccess(tenant, key, id));
};

export const deleteNwcKey = (tenant: string, id: number) => async (dispatch) => {
  const { idToken: { jwtToken } } = await Auth.currentSession() as any;
  axios.delete(DELETE_NWC_KEY_API, { params: { id }, headers: { Authorization: jwtToken, 'Content-Type': 'application/json' } });
  dispatch(deleteNwcKeySuccess(tenant));
};

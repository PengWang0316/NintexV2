import axios from 'axios';

import {
  FETCH_OFFICEKEY_SUCCESS, ADD_OFFICEKEY_SUCCESS, DELETE_OFFICEKEY_SUCCESS,
  RawOfficeApiKey,
} from './types';
import { FETCH_OFFICE_KEYS_API, ADD_OFFICE_KEY_API, DELETE_OFFICE_KEY_API } from '../Urls';
import getJwtToken from '../libs/GetJWTToken';

const fetchOfficeKeySuccess = (keys: RawOfficeApiKey[]) => ({
  type: FETCH_OFFICEKEY_SUCCESS,
  keys,
});

const addOfficeKeySuccess = (endpoint: string, key: string, cookie: string, id: number) => ({
  type: ADD_OFFICEKEY_SUCCESS,
  endpoint,
  cookie,
  key,
  id,
});

const deleteOfficeKeySuccess = (endpoint: string) => ({
  type: DELETE_OFFICEKEY_SUCCESS,
  endpoint,
});

export const fetchOfficeKey = () => async (dispatch) => {
  const { data } = await axios.get(FETCH_OFFICE_KEYS_API, { headers: { Authorization: getJwtToken(), 'Content-Type': 'application/json' } });
  dispatch(fetchOfficeKeySuccess(data));
};

export const addOfficeKey = (endpoint: string, key: string, cookie: string) => async (dispatch) => {
  const { data: id } = await axios.post(ADD_OFFICE_KEY_API, { endpoint, key, cookie }, { headers: { Authorization: getJwtToken(), 'Content-Type': 'application/json' } });
  dispatch(addOfficeKeySuccess(endpoint, key, cookie, id));
};

export const deleteOfficeKey = (endpoint: string, id: number) => async (dispatch) => {
  axios.delete(DELETE_OFFICE_KEY_API, { params: { id }, headers: { Authorization: getJwtToken(), 'Content-Type': 'application/json' } });
  dispatch(deleteOfficeKeySuccess(endpoint));
};

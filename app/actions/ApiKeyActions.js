import axios from 'axios';
import { Auth } from 'aws-amplify';
import { FETCH_NWCKEY_SUCCESS, ADD_NWCKEY_SUCCESS } from './ActionTypes';
import { FETCH_NWC_KEYS_API, ADD_NWC_KEY_API } from './Urls';

const fetchNwcKeySuccess = keys => ({
  type: FETCH_NWCKEY_SUCCESS,
  keys,
});

const addNwcKeySuccess = (tenant, key, id) => ({
  type: ADD_NWCKEY_SUCCESS,
  tenant,
  key,
  id,
});

export const fetchNwcKey = () => async (dispatch) => {
  const { idToken: { jwtToken } } = await Auth.currentSession();
  const { data } = await axios.get(FETCH_NWC_KEYS_API, { headers: { Authorization: jwtToken, 'Content-Type': 'application/json' } });
  dispatch(fetchNwcKeySuccess(data));
};

export const addNwcKey = (tenant, key) => async (dispatch) => {
  const { idToken: { jwtToken } } = await Auth.currentSession();
  const { data } = await axios.post(ADD_NWC_KEY_API, { headers: { Authorization: jwtToken, 'Content-Type': 'application/json' } });
  dispatch(addNwcKeySuccess(tenant, key, data));
};

export default fetchNwcKey;

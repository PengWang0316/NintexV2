import axios from 'axios';
import { Auth } from 'aws-amplify';

import { GET_TAGS_API } from './Urls';
import { FETCH_TAGS_SUCCESS } from './ActionTypes';

const fetchTagsSuccess = tags => ({
  type: FETCH_TAGS_SUCCESS,
  tags,
});

export const fetchTags = () => async (dispatch) => {
  const { idToken: { jwtToken } } = await Auth.currentSession();
  const { data } = await axios.get(GET_TAGS_API, { headers: { Authorization: jwtToken, 'Content-Type': 'application/json' } });
  dispatch(fetchTagsSuccess(data));
};

export default fetchTags;

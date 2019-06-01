import axios from 'axios';
import { Auth } from 'aws-amplify';

import { GET_TAGS_API } from './Urls';
import { FETCH_TAGS_SUCCESS, ADD_TAG_SUCCESS } from './ActionTypes';

const fetchTagsSuccess = tags => ({
  type: FETCH_TAGS_SUCCESS,
  tags,
});

const addTagsSuccess = tag => ({
  type: ADD_TAG_SUCCESS,
  tag,
});

export const fetchTags = () => async (dispatch) => {
  const { idToken: { jwtToken } } = await Auth.currentSession();
  const { data } = await axios.get(GET_TAGS_API, { headers: { Authorization: jwtToken, 'Content-Type': 'application/json' } });
  dispatch(fetchTagsSuccess(data));
};

export const addTag = (content, color) => async (dispatch) => {
  const { idToken: { jwtToken } } = await Auth.currentSession();
  const { data } = await axios.post(GET_TAGS_API, { content, color }, { headers: { Authorization: jwtToken, 'Content-Type': 'application/json' } });

  console.log(data);
  dispatch(addTagsSuccess({ id: data.insertId, content, color }));
};

export default fetchTags;

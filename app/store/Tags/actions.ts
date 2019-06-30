import axios from 'axios';

import {
  FETCH_TAGS_SUCCESS, ADD_TAG_SUCCESS,
  RawTag, TagsActionType,
} from './types';
import { GET_TAGS_API } from '../Urls';
import getJwtToken from '../libs/GetJWTToken';

const fetchTagsSuccess = (tags: RawTag[]): TagsActionType => ({
  type: FETCH_TAGS_SUCCESS,
  tags,
});

const addTagsSuccess = (tag: RawTag): TagsActionType => ({
  type: ADD_TAG_SUCCESS,
  tag,
});

export const fetchTags = () => async (dispatch) => {
  const { data } = await axios.get(GET_TAGS_API, { headers: { Authorization: getJwtToken(), 'Content-Type': 'application/json' } });
  dispatch(fetchTagsSuccess(data));
};

export const addTag = (content, color) => async (dispatch) => {
  const { data } = await axios.post(GET_TAGS_API, { content, color }, { headers: { Authorization: getJwtToken(), 'Content-Type': 'application/json' } });
  dispatch(addTagsSuccess({ id: data.insertId, content, color }));
};

export default fetchTags;

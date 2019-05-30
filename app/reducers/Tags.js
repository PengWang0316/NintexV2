import { FETCH_TAGS_SUCCESS } from '../actions/ActionTypes';

const tags = (state = null, { type, tags: tagsArr }) => {
  switch (type) {
    case FETCH_TAGS_SUCCESS:
      return tagsArr.map(([id, content, color]) => ({ [id]: { content, color } }));
    default:
      return state;
  }
};
export default tags;

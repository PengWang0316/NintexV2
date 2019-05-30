import { FETCH_TAGS_SUCCESS } from '../actions/ActionTypes';

const tags = (state = null, { type, tags: tagsArr }) => {
  switch (type) {
    case FETCH_TAGS_SUCCESS: {
      const tagsObj = {};
      tagsArr.forEach(({ id, content, color }) => { tagsObj[id] = [content, color]; });
      return tagsObj;
    }
    default:
      return state;
  }
};
export default tags;

import {
  FETCH_TAGS_SUCCESS, ADD_TAG_SUCCESS,
  TagsType, TagsActionType,
} from './types';

const tags = (
  state: TagsType = null,
  { type, tags: tagsArr, tag }: TagsActionType,
): TagsType => {
  switch (type) {
    case FETCH_TAGS_SUCCESS: {
      const tagsObj = {};
      tagsArr.forEach(({ id, content, color }) => { tagsObj[id] = [content, color]; });
      return tagsObj;
    }
    case ADD_TAG_SUCCESS:
      return { ...state, [tag.id]: [tag.content, tag.color] };
    default:
      return state;
  }
};
export default tags;

export const FETCH_TAGS_SUCCESS = 'fetchTagsSuccess';
export const REMOVE_TAG_SUCCESS = 'removeTagSuccess';
export const ADD_TAG_SUCCESS = 'addTagSuccess';

export interface TagsType {
  [id: string]: [string, string];
}

export interface RawTag {
  id: number;
  content: string;
  color: string;
}

export interface TagsActionType {
  type: string;
  tags?: RawTag[];
  tag?: RawTag;
}

export const FETCH_ACTION_NAME_COUNT_SUCCESS = 'fetchActionNameCountSuccess';

export type ActionNameCountDataType = { text: string; value: number; [propName: string]: any }[];

export interface ActionnameCount {
  isFetched?: boolean;
  data: ActionNameCountDataType;
}

export interface FetchActionNameCountType {
  type: typeof FETCH_ACTION_NAME_COUNT_SUCCESS;
  actionNameCount: ActionNameCountDataType;
}

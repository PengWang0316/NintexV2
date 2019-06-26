export const FETCH_ACTION_NAME_COUNT_SUCCESS = 'fetchActionNameCountSuccess';

export type DataType = { text: string; value: number; [propName: string]: any }[];

export interface ActionnameCount {
  isFetched?: boolean;
  data: DataType;
}

export interface FetchActionNameCountType {
  type: typeof FETCH_ACTION_NAME_COUNT_SUCCESS;
  actionNameCount: DataType;
}

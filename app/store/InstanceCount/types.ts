export const FETCH_INSTANCE_COUNT_SUCCESS = 'fetchInstanceSuccess';

export interface InstanceCount {
  instanceCount: number;
}

export interface FetchInstanceCountType {
  type: typeof FETCH_INSTANCE_COUNT_SUCCESS;
  instanceCount: number;
}

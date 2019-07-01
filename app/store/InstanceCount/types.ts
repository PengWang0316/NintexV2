export const FETCH_INSTANCE_COUNT_SUCCESS = 'fetchInstanceSuccess';

export type InstanceCount = number;

export interface FetchInstanceCountType {
  type: typeof FETCH_INSTANCE_COUNT_SUCCESS;
  instanceCount: InstanceCount;
}

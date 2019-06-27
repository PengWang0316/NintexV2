import { RawInstanceStatus } from '../InstanceStatus/types';

export const FETCH_INSTANCE_STATUS_BYTIME_SUCCESS = 'fetchInstanceStatusByTimeSuccess';

export interface InstanceStatusByTime {
  isFetched: boolean;
  data: RawInstanceStatus[];
}

export interface FetchInstanceStatusByTimeType {
  type: typeof FETCH_INSTANCE_STATUS_BYTIME_SUCCESS;
  instanceStatus: RawInstanceStatus[];
}

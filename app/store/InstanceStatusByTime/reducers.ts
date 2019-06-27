import { FETCH_INSTANCE_STATUS_BYTIME_SUCCESS, InstanceStatusByTime, FetchInstanceStatusByTimeType } from './types';
import { RawInstanceStatus } from '../InstanceStatus/types';

const defaultState: InstanceStatusByTime = {
  isFetched: false,
  data: [{
    date: '--',
    completed: 0,
    failed: 0,
    started: 0,
    faulting: 0,
    running: 0,
    terminated: 0,
    cancelled: 0,
    terminatedInstance: 0,
  }],
};

// Rename the terminatedInstance to terminated for char display
// Remove the time from statusDate
const format = (array: RawInstanceStatus[]): RawInstanceStatus[] => array.map(item => ({
  ...item,
  statusDate: item.statusDate.slice(0, 10),
  terminated: item.terminatedInstance,
}));

const instanceStatus = (
  state: InstanceStatusByTime = defaultState,
  { type, instanceStatus: status }: FetchInstanceStatusByTimeType,
): InstanceStatusByTime => {
  switch (type) {
    case FETCH_INSTANCE_STATUS_BYTIME_SUCCESS:
      return { isFetched: true, data: format(status) };
    default:
      return state;
  }
};
export default instanceStatus;

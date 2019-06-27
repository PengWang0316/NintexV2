import { FETCH_INSTANCE_STATUS_SUCCESS, InstanceStatus, FetchInstanceStatusType } from './types';

const instanceStatus = (
  state: InstanceStatus = null,
  { type, instanceStatus: status }: FetchInstanceStatusType,
): InstanceStatus => {
  switch (type) {
    case FETCH_INSTANCE_STATUS_SUCCESS: {
      // Calculate the health score
      const {
        completed, failed, started, faulting, running, terminatedInstance: terminated, cancelled,
      } = status;
      const total = completed + failed + started + faulting
                    + running + terminated + cancelled;
      return {
        ...status,
        completedPercentage: `${(completed / total * 100).toFixed(2)}%`,
        failedPercentage: `${(failed / total * 100).toFixed(2)}%`,
        startedPercentage: `${(started / total * 100).toFixed(2)}%`,
        faultingPercentage: `${(faulting / total * 100).toFixed(2)}%`,
        runningPercentage: `${(running / total * 100).toFixed(2)}%`,
        terminatedPercentage: `${(terminated / total * 100).toFixed(2)}%`,
        cancelledPercentage: `${(cancelled / total * 100).toFixed(2)}%`,
      };
    }
    default:
      return state;
  }
};
export default instanceStatus;

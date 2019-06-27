export const FETCH_INSTANCE_STATUS_SUCCESS = 'fetchInstanceStatusSuccess';

export interface InstanceStatus {
  completedPercentage: string;
  failedPercentage: string;
  startedPercentage: string;
  faultingPercentage: string;
  runningPercentage: string;
  terminatedPercentage: string;
  cancelledPercentage: string;
}

export interface RawInstanceStatus {
  completed: number;
  failed: number;
  started: number;
  faulting: number;
  running: number;
  terminatedInstance: number;
  cancelled: number;
}

export interface FetchInstanceStatusType {
  type: typeof FETCH_INSTANCE_STATUS_SUCCESS;
  instanceStatus: RawInstanceStatus;
}

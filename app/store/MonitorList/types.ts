import { Workflow } from '../Workflows/types';

export const FETCH_MONITOR_LIST_SUCCESS = 'fetchMonitorListSuccess';
export const SWITCH_MONITOR_SUCCESS = 'switchMonitorSuccess';
export const UPDATE_INSTANCES_SUCCESS = 'updateInstancesSuccess';

export interface MonitorListData {
  [workflowId: string]: {
    tenant: string;
    instances: {
      [instanceId: string]: {
        startTime: string;
        endTime: string;
        status: string;
      };
    };
    key: string;
    hasFailure: boolean;
  };
}

export interface MonitorListType {
  isFetched: boolean;
  data: MonitorListData;
}

// export interface SwitchMonitorInputDate {
//   isMonitor: number;
//   monitorList: MonitorList;
// }

// interface FetchMonitorListDateType {
//   type: typeof FETCH_MONITOR_LIST_SUCCESS;
//   isMonitor: number;
//   monitorList: MonitorListType;
// }

// interface SwitchMonitorDateType {
//   type: typeof SWITCH_MONITOR_SUCCESS;
//   workflows: Workflows;
// }

// interface UpdateInstancesDateType {
//   type: typeof UPDATE_INSTANCES_SUCCESS;
//   monitorList: MonitorListType;
//   instances: {
//     instanceId: string;
//     startDateTime: string;
//     endDateTime: string;
//     status: string;
//   }[];
// }

export interface MonitorListActionDataType {
  type: string;
  isMonitor?: number;
  monitorList?: MonitorListType;
  workflows?: Workflow[];
  key?: string;
  tenant?: string;
  workflowId: string;
  isMonitored: number;
  instances?: {
    instanceId: string;
    startDateTime: string;
    endDateTime: string;
    status: string;
  }[];
}

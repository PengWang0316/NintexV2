export const FETCH_WORKFLOWS_BY_USER_SUCCESS = 'fetchWorkflowsByUserSuccess';
export const UPDATE_TAG_FROM_WORKFLOW_SUCCESS = 'updateTagFromWorkflowSuccess';
export const APPEND_WORKFLOWS_SUCCESS = 'appendWorkflowsSuccess';
export const UPDATE_WORKFLOW_ACTIVE_SUCCESS = 'updateWorkflowActiveSuccess';
export const SWITCH_MONITOR_SUCCESS = 'switchMonitorSuccess';
export const UPDATE_NWC_LAST_DATE_SUCCESS = 'updateNwcLastDateSuccess';

export interface Workflow {
  workflowId: string;
  workflowName: string;
  publishDate: string;
  publisher: string;
  tags: string | null;
  locationPath?: string;
  isActive?: number;
  tenant?: string;
  isMonitored?: number;
}

export interface Workflows {
  isFetched: boolean;
  data: {
    [workflowId: string]: Workflow;
  };
}

export interface WorkflowsActionType {
  type: string;
  workflows?: Workflow[];
  workflowId?: string;
  tagIds?: string;
  isActive?: number;
  isMonitored?: number;
  formatedWorkflows?: {
    [workflowId: string]: Workflow;
  };
}

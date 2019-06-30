export const FETCH_WORKFLOW_USE_COUNT_SUCCESS = 'fetchWorkflowUseCountSuccess';

export interface WorkflowUseCountDataType {
  actionUse: string;
  useCount: number;
}

export interface WorkflowUseCountType {
  isFetched: boolean;
  data: WorkflowUseCountDataType[];
}

export interface WorkflowUseCountActionType {
  type: string;
  workflowUseCount: WorkflowUseCountDataType[];
}

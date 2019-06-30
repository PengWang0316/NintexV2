export const FETCH_WORKFLOW_LOCATION_COUNT_SUCCESS = 'fetchWorkflowLocationCountSuccess';

export interface WorkflowLocationCountDataType {
  locationName: string;
  locationCount: number;
}

export interface WorkflowLocationCountType {
  isFetched: boolean;
  data: WorkflowLocationCountDataType[];
}

export interface WorkflowLocationCountActionType {
  type: string;
  workflowLocationCount: WorkflowLocationCountDataType[];
}

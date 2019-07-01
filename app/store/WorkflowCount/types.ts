export const FETCH_WORKFLOW_COUNT_SUCCESS = 'fetchWorkflowSuccess';

export type WorkflowCount = number;

export interface WorkflowCountActionType {
  type: string;
  workflowCount: WorkflowCount;
}

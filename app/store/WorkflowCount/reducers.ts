import { FETCH_WORKFLOW_COUNT_SUCCESS, WorkflowCountActionType } from './types';

const workflowCount = (
  state: number = null,
  { type, workflowCount: count }: WorkflowCountActionType,
): number => {
  switch (type) {
    case FETCH_WORKFLOW_COUNT_SUCCESS:
      return count;
    default:
      return state;
  }
};
export default workflowCount;

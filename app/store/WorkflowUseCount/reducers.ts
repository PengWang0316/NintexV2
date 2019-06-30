import { FETCH_WORKFLOW_USE_COUNT_SUCCESS, WorkflowUseCountType, WorkflowUseCountActionType } from './types';

const workflowUseCount = (
  state: WorkflowUseCountType = { isFetched: false, data: [] },
  { type, workflowUseCount: count }: WorkflowUseCountActionType,
): WorkflowUseCountType => {
  switch (type) {
    case FETCH_WORKFLOW_USE_COUNT_SUCCESS:
      return { isFetched: true, data: count };
    default:
      return state;
  }
};
export default workflowUseCount;

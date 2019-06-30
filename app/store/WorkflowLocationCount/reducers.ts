import { FETCH_WORKFLOW_LOCATION_COUNT_SUCCESS, WorkflowLocationCountType, WorkflowLocationCountActionType } from './types';

const workflowLocationCount = (
  state: WorkflowLocationCountType = { isFetched: false, data: [] },
  { type, workflowLocationCount: count }: WorkflowLocationCountActionType,
): WorkflowLocationCountType => {
  switch (type) {
    case FETCH_WORKFLOW_LOCATION_COUNT_SUCCESS:
      return { isFetched: true, data: count };
    default:
      return state;
  }
};
export default workflowLocationCount;

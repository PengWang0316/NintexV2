import axios from 'axios';

import { FETCH_WORKFLOW_LOCATION_COUNT_SUCCESS, WorkflowLocationCountActionType, WorkflowLocationCountDataType } from './types';
import { GET_WORKFLOWS_LOCATION_COUNT_API } from '../Urls';
import getJwtToken from '../../libs/GetJWTToken';

const fetchWorkflowLocationCountSuccess = (
  workflowLocationCount: WorkflowLocationCountDataType[],
): WorkflowLocationCountActionType => ({
  type: FETCH_WORKFLOW_LOCATION_COUNT_SUCCESS,
  workflowLocationCount,
});

export const fetchWorkflowLocationCount = () => async (dispatch) => {
  const { data } = await axios.get(GET_WORKFLOWS_LOCATION_COUNT_API, { headers: { Authorization: getJwtToken(), 'Content-Type': 'application/json' } });
  dispatch(fetchWorkflowLocationCountSuccess(data));
};
export default fetchWorkflowLocationCount;

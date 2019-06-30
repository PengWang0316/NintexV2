import axios from 'axios';

import { FETCH_WORKFLOW_USE_COUNT_SUCCESS, WorkflowUseCountActionType, WorkflowUseCountDataType } from './types';
import { GET_WORKFLOW_USE_COUNT_API } from '../Urls';
import getJwtToken from '../../libs/GetJWTToken';

const fetchWorkflowUseCountSuccess = (
  workflowUseCount: WorkflowUseCountDataType[],
): WorkflowUseCountActionType => ({
  type: FETCH_WORKFLOW_USE_COUNT_SUCCESS,
  workflowUseCount,
});

const fetchWorkflowUseCount = () => async (dispatch) => {
  const { data } = await axios.get(GET_WORKFLOW_USE_COUNT_API, { headers: { Authorization: await getJwtToken(), 'Content-Type': 'application/json' } });
  dispatch(fetchWorkflowUseCountSuccess(data));
};

export default fetchWorkflowUseCount;

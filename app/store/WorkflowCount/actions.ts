import axios from 'axios';

import { FETCH_WORKFLOW_COUNT_SUCCESS, WorkflowCountActionType } from './types';
import { GET_WORKFLOWS_COUNT_API } from '../Urls';
import getJwtToken from '../libs/GetJWTToken';

const fetchWorkflowCountSuccess = (workflowCount: number): WorkflowCountActionType => ({
  type: FETCH_WORKFLOW_COUNT_SUCCESS,
  workflowCount,
});

export const fetchWorkflowCount = () => async (dispatch) => {
  const { data: { count } } = await axios.get(GET_WORKFLOWS_COUNT_API, { headers: { Authorization: getJwtToken(), 'Content-Type': 'application/json' } });
  dispatch(fetchWorkflowCountSuccess(count));
};
export default fetchWorkflowCount;

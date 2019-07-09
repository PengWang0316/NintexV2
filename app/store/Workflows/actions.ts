import axios from 'axios';

import {
  FETCH_WORKFLOWS_BY_USER_SUCCESS, UPDATE_TAG_FROM_WORKFLOW_SUCCESS, SWITCH_MONITOR_SUCCESS,
  APPEND_WORKFLOWS_SUCCESS, UPDATE_WORKFLOW_ACTIVE_SUCCESS, UPDATE_NWC_LAST_DATE_SUCCESS,
  Workflow, WorkflowsActionType, SwitchMonitorActInterface, UpdateTagFromWorkflowInterface,
  RunWorkflowInterface, StopWorkflowInterface,
} from './types';
import {
  GET_WORKFLOWS_BY_USER_API, UPDATE_TAG_FROM_WORKFLOW_API, ADD_NWC_WORKFLOWS_API,
  UPDATE_NWC_ACTIVE_API, UPDATE_NWC_ISMONITORED_API, NOTIFICATION_EMAIL_API,
} from '../Urls';
import { BEARER_HEADER, NWC_LIST_WORKFLOWS_API, NWC_PLATFORM } from '../../config';
import getJwtToken from '../../libs/GetJWTToken';

const fetchWorkflowsByUserSuccess = (workflows: Workflow[]): WorkflowsActionType => ({
  type: FETCH_WORKFLOWS_BY_USER_SUCCESS,
  workflows,
});

const updateTagFromWorkflowSuccess = (workflowId: string, tagIds: string): WorkflowsActionType => ({
  type: UPDATE_TAG_FROM_WORKFLOW_SUCCESS,
  workflowId,
  tagIds,
});

const updateLastDateSuccess = (tenant: string, lastDate) => ({
  type: UPDATE_NWC_LAST_DATE_SUCCESS,
  tenant,
  lastDate,
});

const changeWorkflowActiveSuccess = (workflowId: string, isActive: number) => ({
  type: UPDATE_WORKFLOW_ACTIVE_SUCCESS,
  workflowId,
  isActive,
});

const switchMonitorSuccess = (
  workflowId: string, tenant: string, isMonitored: number, key: string,
) => ({
  type: SWITCH_MONITOR_SUCCESS,
  workflowId,
  tenant,
  isMonitored,
  key,
});

export const appandWorkflows = formatedWorkflows => ({
  type: APPEND_WORKFLOWS_SUCCESS,
  formatedWorkflows,
});

export const fetchWorkflowsByUser = () => async (dispatch) => {
  const { data } = await axios.get(GET_WORKFLOWS_BY_USER_API, { headers: { Authorization: await getJwtToken(), 'Content-Type': 'application/json' } });
  dispatch(fetchWorkflowsByUserSuccess(data));
  // dispatch(fetchMonitorListSuccess(data));
};

export const updateTagFromWorkflow: UpdateTagFromWorkflowInterface = (
  workflowId, tagIds,
) => async (dispatch) => {
  // In the future, we may consider to wait the backend result and handle the potential failures.
  axios.put(UPDATE_TAG_FROM_WORKFLOW_API, { tags: tagIds, id: workflowId }, { headers: { Authorization: await getJwtToken(), 'Content-Type': 'application/json' } });
  dispatch(updateTagFromWorkflowSuccess(workflowId, tagIds));
};

const formatWorkflow = (workflow, tenant = '') => {
  const isPublished = Object.keys(workflow.published).length !== 0;
  const eventTypeName = isPublished ? workflow.published.eventType.name : workflow.draft.eventType.name;
  const type = isPublished ? workflow.published.publishedType : '';
  const description = isPublished ? workflow.published.description : workflow.draft.description;
  const authorId = isPublished ? workflow.published.author.id : workflow.draft.author.id;
  const authorEmail = isPublished ? workflow.published.author.email : workflow.draft.author.email;
  const authorName = isPublished ? workflow.published.author.name : workflow.draft.author.name;
  const publishedType = isPublished ? workflow.published.publishedType : null;
  const publishedId = isPublished ? workflow.published.id : null;
  const eventType = isPublished ? workflow.published.eventType : workflow.draft.eventType;
  const eventConfiguration = isPublished ? workflow.published.eventConfiguration : workflow.draft.eventConfiguration;
  const lastPublished = isPublished ? workflow.published.lastPublished : null;

  return {
    platform: NWC_PLATFORM,
    tenant,
    workflowId: workflow.id,
    department: '',
    name: workflow.name,
    status: isPublished ? 'Published' : 'Draft',
    active: isPublished ? workflow.published.isActive : '',
    created: isPublished
      ? new Date(workflow.published.created)
      : new Date(workflow.draft.created),
    editedBy: isPublished ? workflow.published.author.name : workflow.draft.author.name,
    secondaryInfo: JSON.stringify({
      eventType: eventTypeName, type, description, tenant,
    }),
    authorId,
    authorName,
    authorEmail,
    publishedId,
    publishedType,
    eventType,
    eventConfiguration,
    lastPublished,
    description,
  };
};

// In charge of turning the workflow object to one array and one object
// One for insert and another one for updating the Redux state
const parseData = (data, tenant: string, existedWorkflows, options = { isAutoFetching: false }) => {
  const insertWorkflows = [];
  const reduxState = {};
  data.forEach((workflow) => {
    if (!existedWorkflows[workflow.id]) {
      const {
        workflowId, status, name, authorName, authorId, authorEmail,
        created, eventConfiguration, eventType, active, lastPublished, publishedType,
        publishedId, description,
      } = formatWorkflow(workflow, tenant);

      insertWorkflows.push([
        workflowId,
        status === 'Published' ? 1 : 0,
        name,
        authorName,
        authorId,
        authorEmail,
        created,
        JSON.stringify(eventConfiguration),
        JSON.stringify(eventType),
        active === '' || options.isAutoFetching ? 0 : 1,
        lastPublished,
        publishedType,
        publishedId,
        tenant,
        description,
      ]);

      reduxState[workflowId] = {
        workflowId,
        workflowName: name,
        publishDate: created,
        publisher: authorName,
        tag: null,
        isActive: active === '' || options.isAutoFetching ? 0 : 1,
        tenant,
      };
    }
  });
  return { insertWorkflows, reduxState };
};

const fetchNwcWorkflows = async (key: string, limit = '1000') => {
  const { data: { workflows } } = await axios.get(
    NWC_LIST_WORKFLOWS_API,
    {
      headers: { authorization: `${BEARER_HEADER} ${key}` },
      params: {
        limit, sortBy: 'created', sortOrder: 'desc',
      },
    },
  );
  return workflows;
};

export const addNwcWorkflows = (
  tenant: string, key: string, existedWorkflows, isAutoFetching = false,
) => async (dispatch) => {
  const rawWorkflows = await fetchNwcWorkflows(key, isAutoFetching ? '100' : '1000');
  // Dispatch the lastest update date for this tenant
  dispatch(updateLastDateSuccess(tenant, formatWorkflow(rawWorkflows[0]).created));
  const { insertWorkflows, reduxState } = parseData(rawWorkflows, tenant, existedWorkflows, { isAutoFetching });
  // If any workflow that has to be inserted, the Redux state also should be updated
  if (insertWorkflows.length !== 0) {
    dispatch(appandWorkflows(reduxState));
    axios.post(
      ADD_NWC_WORKFLOWS_API,
      { workflows: insertWorkflows, isAutoFetching, key },
      { headers: { Authorization: await getJwtToken(), 'Content-Type': 'application/json' } },
    );
    // Call the notification email API
    axios.get(NOTIFICATION_EMAIL_API, { headers: { Authorization: await getJwtToken(), 'Content-Type': 'application/json' } });
  }
};

export const runWorkflow: RunWorkflowInterface = (workflowId, key) => async (dispatch) => {
  // Somehow, the NWC server gives error to some workflow id.
  // Keeping the NWC post call first can help to prevent
  // updating our database when activating fails.
  await axios.post(
    `${NWC_LIST_WORKFLOWS_API}/${workflowId}/activate`,
    {},
    {
      headers: { authorization: `${BEARER_HEADER} ${key}` },
    },
  );
  axios.put(UPDATE_NWC_ACTIVE_API, { workflowId, isActive: 1 }, { headers: { Authorization: await getJwtToken(), 'Content-Type': 'application/json' } });
  dispatch(changeWorkflowActiveSuccess(workflowId, 1));
};

export const switchMonitor: SwitchMonitorActInterface = (
  workflowId, tenant, isMonitored, key,
) => async (dispatch) => {
  dispatch(switchMonitorSuccess(workflowId, tenant, isMonitored, key));
  axios.put(UPDATE_NWC_ISMONITORED_API, { workflowId, isMonitored }, { headers: { Authorization: await getJwtToken(), 'Content-Type': 'application/json' } });
};

export const stopWorkflow: StopWorkflowInterface = (workflowId, key) => async (dispatch) => {
  // Somehow, the NWC server gives error to some workflow id.
  // Keeping the NWC post call first can help to prevent updating our database when activating fails.
  await axios.post(
    `${NWC_LIST_WORKFLOWS_API}/${workflowId}/deactivate`,
    {},
    {
      headers: { authorization: `${BEARER_HEADER} ${key}` },
    },
  );
  axios.put(UPDATE_NWC_ACTIVE_API, { workflowId, isActive: 0 }, { headers: { Authorization: await getJwtToken(), 'Content-Type': 'application/json' } });
  dispatch(changeWorkflowActiveSuccess(workflowId, 0));
};

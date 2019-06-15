import axios from 'axios';
import { Auth } from 'aws-amplify';

import { ADD_NWC_WORKFLOWS_API } from './Urls';
import { BEARER_HEADER, NWC_LIST_WORKFLOWS_API, NWC_PLATFORM } from '../config';
import { appandWorkflows } from './WorkflowActions';

const parseDataToArray = (data, tenant) => {
  const arr = data.map((item, index) => {
    const isPublished = Object.keys(item.published).length !== 0;
    const eventTypeName = isPublished ? item.published.eventType.name : item.draft.eventType.name;
    const type = isPublished ? item.published.publishedType : '';
    const description = isPublished ? item.published.description : item.draft.description;
    const authorId = isPublished ? item.published.author.id : item.draft.author.id;
    const authorEmail = isPublished ? item.published.author.email : item.draft.author.email;
    const authorName = isPublished ? item.published.author.name : item.draft.author.name;
    const publishedType = isPublished ? item.published.publishedType : null;
    const publishedId = isPublished ? item.published.id : null;
    const eventType = isPublished ? item.published.eventType : item.draft.eventType;
    const eventConfiguration = isPublished ? item.published.eventConfiguration : item.draft.eventConfiguration;
    const lastPublished = isPublished ? item.published.lastPublished : null;

    return {
      id: index,
      platform: NWC_PLATFORM,
      tenant,
      workflowId: item.id,
      department: '',
      name: item.name,
      status: isPublished ? 'Published' : 'Draft',
      active: isPublished ? item.published.isActive : '',
      created: isPublished
        ? new Date(item.published.created)
        : new Date(item.draft.created),
      editedBy: isPublished ? item.published.author.name : item.draft.author.name,
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
  });
  // Sort by created data
  // return arr.sort((prev, next) => next.created - prev.created);
  return arr;
};

const fetchNwcWorkflows = async (key, tenant) => {
  const { data: { workflows } } = await axios.get(
    NWC_LIST_WORKFLOWS_API,
    {
      headers: { authorization: `${BEARER_HEADER} ${key}` },
      params: {
        limit: '1000', sortBy: 'created', sortOrder: 'desc', tenant: key,
      },
    },
  );
  return parseDataToArray(workflows, tenant);
};

// In charge of turning the workflow object to two arrays
// One for insert and another one for updating the Redux state
const transferToInsertWorkflows = (workflows, existedWorkflows) => {
  const insertWorkflows = [];
  const reduxState = {};
  workflows.forEach((workflow) => {
    if (!existedWorkflows[workflow.workflowId]) {
      const {
        workflowId, status, name, authorName, authorId, authorEmail,
        created, eventConfiguration, eventType, active, lastPublished, publishedType,
        publishedId, tenant, description,
      } = workflow;

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
        active === '' ? 0 : 1,
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
        isActive: active === '' ? 0 : 1,
        tenant,
      };
    }
  });
  return { insertWorkflows, reduxState };
};

export const addNwcWorkflows = (tenant, key, existedWorkflows) => async (dispatch) => {
  const { idToken: { jwtToken } } = await Auth.currentSession();
  const workflowObject = await fetchNwcWorkflows(key, tenant);
  console.log(workflowObject);
  console.warn('----------------------');
  const { insertWorkflows, reduxState } = transferToInsertWorkflows(workflowObject, existedWorkflows);
  console.log(reduxState);
  // If any workflow that has to be inserted, the Redux state also should be updated
  if (insertWorkflows.length !== 0) {
    dispatch(appandWorkflows(reduxState));
    axios.post(ADD_NWC_WORKFLOWS_API, { workflows: insertWorkflows }, { headers: { Authorization: jwtToken, 'Content-Type': 'application/json' } });
  }
};

export default addNwcWorkflows;

import axios from 'axios';
import { Auth } from 'aws-amplify';

import { ADD_NWC_WORKFLOWS_API } from './Urls';
import { BEARER_HEADER, NWC_LIST_WORKFLOWS_API, NWC_PLATFORM } from '../config';
import { appandWorkflows } from './WorkflowActions';

const formatWorkflow = (workflow, tenant) => {
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
const parseData = (data, tenant, existedWorkflows) => {
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

const fetchNwcWorkflows = async (key) => {
  const { data: { workflows } } = await axios.get(
    NWC_LIST_WORKFLOWS_API,
    {
      headers: { authorization: `${BEARER_HEADER} ${key}` },
      params: {
        limit: '1000', sortBy: 'created', sortOrder: 'desc', tenant: key,
      },
    },
  );
  return workflows;
};

// In charge of turning the workflow object to one array and one object
// One for insert and another one for updating the Redux state
// const transferToInsertWorkflows = (workflows, existedWorkflows) => {
//   const insertWorkflows = [];
//   const reduxState = {};
//   workflows.forEach((workflow) => {
//     if (!existedWorkflows[workflow.workflowId]) {
//       const {
//         workflowId, status, name, authorName, authorId, authorEmail,
//         created, eventConfiguration, eventType, active, lastPublished, publishedType,
//         publishedId, tenant, description,
//       } = workflow;

//       insertWorkflows.push([
//         workflowId,
//         status === 'Published' ? 1 : 0,
//         name,
//         authorName,
//         authorId,
//         authorEmail,
//         created,
//         JSON.stringify(eventConfiguration),
//         JSON.stringify(eventType),
//         active === '' ? 0 : 1,
//         lastPublished,
//         publishedType,
//         publishedId,
//         tenant,
//         description,
//       ]);

//       reduxState[workflowId] = {
//         workflowId,
//         workflowName: name,
//         publishDate: created,
//         publisher: authorName,
//         tag: null,
//         isActive: active === '' ? 0 : 1,
//         tenant,
//       };
//     }
//   });
//   return { insertWorkflows, reduxState };
// };

export const addNwcWorkflows = (tenant, key, existedWorkflows) => async (dispatch) => {
  const { idToken: { jwtToken } } = await Auth.currentSession();
  const rawWorkflows = await fetchNwcWorkflows(key);
  const { insertWorkflows, reduxState } = parseData(rawWorkflows, tenant, existedWorkflows);
  console.log(insertWorkflows);
  console.log(reduxState);
  // If any workflow that has to be inserted, the Redux state also should be updated
  if (insertWorkflows.length !== 0) {
    dispatch(appandWorkflows(reduxState));
    axios.post(ADD_NWC_WORKFLOWS_API, { workflows: insertWorkflows }, { headers: { Authorization: jwtToken, 'Content-Type': 'application/json' } });
  }
};

export default addNwcWorkflows;

import { combineReducers } from 'redux';
// import { routerReducer } from 'react-router-redux';

import user from './User';
import workflowCount from './WorkflowCount';
import instanceCount from './InstanceCount';
import publisherCount from './PublisherCount';
import instanceStatus from './InstanceStatus';


export default combineReducers({
  instanceCount,
  instanceStatus,
  publisherCount,
  user,
  workflowCount,
});

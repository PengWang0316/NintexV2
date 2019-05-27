import { combineReducers } from 'redux';
// import { routerReducer } from 'react-router-redux';

import user from './User';
import workflowCount from './WorkflowCount';
import instanceCount from './InstanceCount';
import publisherCount from './PublisherCount';
import instanceStatus from './InstanceStatus';
import instanceStatusByTime from './InstanceStatusByTime';


export default combineReducers({
  instanceCount,
  instanceStatus,
  instanceStatusByTime,
  publisherCount,
  user,
  workflowCount,
});

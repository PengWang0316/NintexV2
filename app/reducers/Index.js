import { combineReducers } from 'redux';
// import { routerReducer } from 'react-router-redux';

import user from './User';
import workflowCount from './WorkflowCount';
import instanceCount from './InstanceCount';
import publisherCount from './PublisherCount';


export default combineReducers({
  instanceCount,
  publisherCount,
  user,
  workflowCount,
});

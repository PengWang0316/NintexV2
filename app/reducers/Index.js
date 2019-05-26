import { combineReducers } from 'redux';
// import { routerReducer } from 'react-router-redux';

import user from './User';
import workflowCount from './WorkflowCount';
import instanceCount from './InstanceCount';


export default combineReducers({
  instanceCount,
  user,
  workflowCount,
});

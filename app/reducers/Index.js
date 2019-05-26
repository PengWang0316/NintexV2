import { combineReducers } from 'redux';
// import { routerReducer } from 'react-router-redux';

import user from './User';
import workflowCount from './WorkflowCount';


export default combineReducers({
  user,
  workflowCount,
});

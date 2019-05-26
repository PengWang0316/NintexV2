import { combineReducers } from 'redux';
// import { routerReducer } from 'react-router-redux';

import user from './User';
import workflowsCount from './WorkflowsCount';


export default combineReducers({
  user,
  workflowsCount,
});

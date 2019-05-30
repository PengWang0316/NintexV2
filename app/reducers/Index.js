import { combineReducers } from 'redux';
// import { routerReducer } from 'react-router-redux';

import user from './User';
import workflowCount from './WorkflowCount';
import instanceCount from './InstanceCount';
import publisherCount from './PublisherCount';
import instanceStatus from './InstanceStatus';
import instanceStatusByTime from './InstanceStatusByTime';
import workflowLocationCount from './WorkflowLocationCount';
import topPublishersCount from './TopPublishersCount';
import actionNameCount from './ActionNameCount';
import workflowUseCount from './WorkflowUseCount';
import workflows from './Workflows';
import tags from './Tags';

export default combineReducers({
  actionNameCount,
  instanceCount,
  instanceStatus,
  instanceStatusByTime,
  publisherCount,
  user,
  tags,
  topPublishersCount,
  workflowCount,
  workflowLocationCount,
  workflowUseCount,
  workflows,
});

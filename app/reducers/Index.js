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
import nwcKeys from './NWCKeys';
import officeKeys from './OfficeKeys';
import lastNwc from './LastNwc';
import monitorList from './MonitorList';

export default combineReducers({
  actionNameCount,
  instanceCount,
  instanceStatus,
  instanceStatusByTime,
  lastNwc,
  monitorList,
  nwcKeys,
  officeKeys,
  publisherCount,
  user,
  tags,
  topPublishersCount,
  workflowCount,
  workflowLocationCount,
  workflowUseCount,
  workflows,
});

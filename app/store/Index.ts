import { combineReducers } from 'redux';
// import { routerReducer } from 'react-router-redux';

import actionNameCount from './ActionNameCount/reducers';
import instanceCount from './InstanceCount/reducers';
import instanceStatus from './InstanceStatus/reducers';
import instanceStatusByTime from './InstanceStatusByTime/reducers';

import user from './User';
import workflowCount from './WorkflowCount';
import publisherCount from './PublisherCount';
import workflowLocationCount from './WorkflowLocationCount';
import topPublishersCount from './TopPublishersCount';
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

export type AppState = ReturnType<typeof combineReducers>;

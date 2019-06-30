import { combineReducers } from 'redux';
// import { routerReducer } from 'react-router-redux';

import actionNameCount from './ActionNameCount/reducers';
import instanceCount from './InstanceCount/reducers';
import instanceStatus from './InstanceStatus/reducers';
import instanceStatusByTime from './InstanceStatusByTime/reducers';

import user from './User/reducers';
import workflowCount from './WorkflowCount/reducers';
import publisherCount from './PublisherCount/reducers';
import workflowLocationCount from './WorkflowLocationCount/reducers';
import topPublishersCount from './TopPublishersCount/reducers';
import workflowUseCount from './WorkflowUseCount/reducers';
import workflows from './Workflows/reducers';
import tags from './Tags/reducers';
import nwcKeys from './NWCKeys/reducers';
import officeKeys from './OfficeKeys/reducers';
import lastNwc from './LastNwc/reducers';
import monitorList from './MonitorList/reducers';

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

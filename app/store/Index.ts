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

import { ActionnameCount } from './ActionNameCount/types';
import { InstanceCount } from './InstanceCount/types';
import { InstanceStatus } from './InstanceStatus/types';
import { InstanceStatusByTime } from './InstanceStatusByTime/types';
import { LastNwcType } from './LastNwc/types';
import { MonitorListType } from './MonitorList/types';
import { NWCKeysType } from './NWCKeys/types';
import { OfficeKeysType } from './OfficeKeys/types';
import { PublisherCount } from './PublisherCount/types';
import { TagsType } from './Tags/types';
import { TopPublishersCountType } from './TopPublishersCount/types';
import { UserType } from './User/types';
import { WorkflowCount } from './WorkflowCount/types';
import { WorkflowLocationCountType } from './WorkflowLocationCount/types';
import { Workflows } from './Workflows/types';
import { WorkflowUseCountType } from './WorkflowUseCount/types';

export type ReduxStateType = ActionnameCount & InstanceCount & InstanceStatus
& InstanceStatusByTime & LastNwcType & MonitorListType & NWCKeysType
& OfficeKeysType & PublisherCount & TagsType & TopPublishersCountType & UserType
& WorkflowCount & WorkflowLocationCountType & Workflows & WorkflowUseCountType;

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

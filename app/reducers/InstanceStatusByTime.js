import { FETCH_INSTANCE_STATUS_BYTIME_SUCCESS } from '../actions/ActionTypes';

const defaultState = {
  isFetched: false,
  data: [{
    date: '--',
    completed: 0,
    failed: 0,
    started: 0,
    falting: 0,
    running: 0,
    terminated: 0,
    cancelled: 0,
  }],
};

// Rename the terminatedInstance to terminated for char display
// Remove the time from statusDate
const format = array => array.map(item => ({
  ...item,
  statusDate: item.statusDate.slice(0, 10),
  terminated: item.terminatedInstance,
}));

const instanceStatus = (state = defaultState, { type, instanceStatus: status }) => {
  switch (type) {
    case FETCH_INSTANCE_STATUS_BYTIME_SUCCESS:
      return { isFetched: true, data: format(status) };
    default:
      return state;
  }
};
export default instanceStatus;

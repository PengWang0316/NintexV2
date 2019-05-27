import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

import { fetchInstanceStatusByTime as fetchInstanceStatusByTimeAction } from '../actions/InstanceActions';

export const WorkflowRunInstanceChart = ({ instanceStatusByTime, fetchInstanceStatusByTime }) => {
  useEffect(() => {
    if (!instanceStatusByTime.isFetched) fetchInstanceStatusByTime();
  });

  return (
    <LineChart
      width={700}
      height={300}
      data={instanceStatusByTime.data}
      margin={{
        top: 5, right: 30, left: 20, bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="statusDate" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="completed" stroke="#8884d8" activeDot={{ r: 8 }} />
      <Line type="monotone" dataKey="failed" stroke="#82ca9d" />
      <Line type="monotone" dataKey="started" stroke="#82ca9d" />
      <Line type="monotone" dataKey="faulting" stroke="#82ca9d" />
      <Line type="monotone" dataKey="running" stroke="#82ca9d" />
      <Line type="monotone" dataKey="terminated" stroke="#82ca9d" />
      <Line type="monotone" dataKey="cancelled" stroke="#82ca9d" />
    </LineChart>
  );
};
WorkflowRunInstanceChart.propTypes = {
  instanceStatusByTime: PropTypes.objectOf(PropTypes.any).isRequired,
  fetchInstanceStatusByTime: PropTypes.func.isRequired,
};
// WorkflowRunInstanceChart.defaultProps = { instanceStatusByTime: null };
const mapStateToProps = state => ({ instanceStatusByTime: state.instanceStatusByTime });
const mapDispatchToProps = { fetchInstanceStatusByTime: fetchInstanceStatusByTimeAction };
export default connect(mapStateToProps, mapDispatchToProps)(WorkflowRunInstanceChart);

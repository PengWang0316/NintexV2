import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Brush, ResponsiveContainer,
} from 'recharts';
import {
  lightGreen, red, pink, blue, purple,
} from '@material-ui/core/colors';

import { fetchInstanceStatusByTime as fetchInstanceStatusByTimeAction } from '../actions/InstanceActions';

export const WorkflowRunInstanceChart = ({ instanceStatusByTime, fetchInstanceStatusByTime }) => {
  useEffect(() => {
    if (!instanceStatusByTime.isFetched) fetchInstanceStatusByTime();
  });

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart
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
        <Brush dataKey="statusDate" height={10} stroke={lightGreen[900]} />
        <Line type="monotone" dataKey="completed" stroke={lightGreen[500]} dot={false} activeDot />
        <Line type="monotone" dataKey="failed" stroke={red[500]} dot={false} activeDot />
        <Line type="monotone" dataKey="started" stroke={lightGreen[900]} dot={false} activeDot />
        <Line type="monotone" dataKey="faulting" stroke={pink[300]} dot={false} activeDot />
        <Line type="monotone" dataKey="running" stroke={blue[300]} dot={false} activeDot />
        <Line type="monotone" dataKey="terminated" stroke={purple[400]} dot={false} activeDot />
        <Line type="monotone" dataKey="cancelled" stroke={blue[900]} dot={false} activeDot />
      </LineChart>
    </ResponsiveContainer>
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

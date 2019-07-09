import React, { useEffect, memo } from 'react';
import { connect } from 'react-redux';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Brush, ResponsiveContainer,
} from 'recharts';
import {
  lightGreen, red, pink, blue, purple,
} from '@material-ui/core/colors';

import { fetchInstanceStatusByTime as fetchInstanceStatusByTimeAction } from '../store/InstanceStatusByTime/actions';
import { InstanceStatusByTime } from '../store/InstanceStatusByTime/types';
import { AppState } from '../store/ConfigureStore';

interface Props {
  instanceStatusByTime: InstanceStatusByTime;
  fetchInstanceStatusByTime: Function;
}

let isFetching = false;

export const WorkflowRunInstanceChart = ({ instanceStatusByTime, fetchInstanceStatusByTime }) => {
  useEffect(() => {
    if (!instanceStatusByTime.isFetched && !isFetching) {
      fetchInstanceStatusByTime();
      isFetching = true;
    }
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

const mapStateToProps = (state: AppState) => ({ instanceStatusByTime: state.instanceStatusByTime });
const mapDispatchToProps = { fetchInstanceStatusByTime: fetchInstanceStatusByTimeAction };
export default connect(mapStateToProps, mapDispatchToProps)(memo(WorkflowRunInstanceChart));

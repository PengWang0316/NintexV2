import React, { useEffect, memo } from 'react';
import { connect } from 'react-redux';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';

import { fetchWorkflowLocationCount as fetchWorkflowLocationCountAction } from '../store/WorkflowLocationCount/actions';
import { AppState } from '../store/ConfigureStore';
import { WorkflowLocationCountType } from '../store/WorkflowLocationCount/types';

interface Props {
  fetchWorkflowLocationCount: Function;
  workflowLocationCount: WorkflowLocationCountType;
}

let isFetching = false;

const WorkflowLocationChart = ({ fetchWorkflowLocationCount, workflowLocationCount }: Props) => {
  useEffect(() => {
    if (!workflowLocationCount.isFetched && !isFetching) {
      fetchWorkflowLocationCount();
      isFetching = true;
    }
  });
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        width={500}
        height={300}
        data={workflowLocationCount.data}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="locationName" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="locationCount" label fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

const mapStateToProps = (state: AppState) => ({
  workflowLocationCount: state.workflowLocationCount,
});
const mapDispatchToProps = {
  fetchWorkflowLocationCount: fetchWorkflowLocationCountAction,
};
export default connect(mapStateToProps, mapDispatchToProps)(memo(WorkflowLocationChart));

import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

import { fetchWorkflowLocationCount as fetchWorkflowLocationCountAction } from '../actions/WorkflowActions';

const WorkflowLocationChart = ({ fetchWorkflowLocationCount, workflowLocationCount }) => {
  useEffect(() => {
    if (!workflowLocationCount.isFetched) fetchWorkflowLocationCount();
  });
  return (
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
  );
};
WorkflowLocationChart.propTypes = {
  fetchWorkflowLocationCount: PropTypes.func.isRequired,
  workflowLocationCount: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.boolean, PropTypes.array]),
  ).isRequired,
};
const mapStateToProps = state => ({
  workflowLocationCount: state.workflowLocationCount,
});
const mapDispatchToProps = {
  fetchWorkflowLocationCount: fetchWorkflowLocationCountAction,
};
export default connect(mapStateToProps, mapDispatchToProps)(WorkflowLocationChart);

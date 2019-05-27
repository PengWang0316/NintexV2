import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Pie, PieChart, Cell, Legend, Tooltip,
} from 'recharts';
// import I18n from '@kevinwang0316/i18n';

import { fetchWorkflowUseCount as fetchWorkflowUseCountAction } from '../actions/ActionActions';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx, cy, midAngle, innerRadius, outerRadius, percent,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};
renderCustomizedLabel.propTypes = {
  cx: PropTypes.number.isRequired,
  cy: PropTypes.number.isRequired,
  midAngle: PropTypes.number.isRequired,
  innerRadius: PropTypes.number.isRequired,
  outerRadius: PropTypes.number.isRequired,
  percent: PropTypes.number.isRequired,
};

export const WorkflowUseChart = ({ fetchWorkflowUseCount, workflowUseCount }) => {
  useEffect(() => {
    if (!workflowUseCount.isFetched) fetchWorkflowUseCount();
  });
  return (
    <PieChart width={390} height={370}>
      <Legend dataKey="actionUse" />
      <Tooltip />
      <Pie
        data={workflowUseCount.data}
        cx={200}
        cy={200}
        labelLine={false}
        label={renderCustomizedLabel}
        outerRadius={120}
        fill="#8884d8"
        nameKey="actionUse"
        dataKey="useCount"
      >
        {
            workflowUseCount.data.map((entry, index) => <Cell key={`cell-${entry.actionUse}`} fill={COLORS[index % COLORS.length]} />)
          }
      </Pie>
    </PieChart>
  );
};
WorkflowUseChart.propTypes = {
  fetchWorkflowUseCount: PropTypes.func.isRequired,
  workflowUseCount: PropTypes.objectOf(PropTypes.any).isRequired,
};
const mapStateToProps = state => ({
  workflowUseCount: state.workflowUseCount,
});
const mapDispatchToProps = {
  fetchWorkflowUseCount: fetchWorkflowUseCountAction,
};
export default connect(mapStateToProps, mapDispatchToProps)(WorkflowUseChart);

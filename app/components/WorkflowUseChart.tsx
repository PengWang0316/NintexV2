import React, { useEffect, memo } from 'react';
import { connect } from 'react-redux';
import {
  Pie, PieChart, Cell, Legend, Tooltip, ResponsiveContainer,
} from 'recharts';
// import I18n from '@kevinwang0316/i18n';

import { fetchWorkflowUseCount as fetchWorkflowUseCountAction } from '../store/WorkflowUseCount/actions';
import { WorkflowUseCountType } from '../store/WorkflowUseCount/types';
import { AppState } from '../store/ConfigureStore';

interface RenderCustomizedLabelProp {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
const RADIAN = Math.PI / 180;
const renderCustomizedLabel = memo(({
  cx, cy, midAngle, innerRadius, outerRadius, percent,
}: RenderCustomizedLabelProp) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
});

let isFetching = false;

interface WorkflowUseCount {
  fetchWorkflowUseCount: Function;
  workflowUseCount: WorkflowUseCountType;
}

export const WorkflowUseChart = ({ fetchWorkflowUseCount, workflowUseCount }: WorkflowUseCount) => {
  useEffect(() => {
    if (!workflowUseCount.isFetched && !isFetching) {
      fetchWorkflowUseCount();
      isFetching = true;
    }
  });
  return (
    <ResponsiveContainer width="100%" height={370}>
      <PieChart>
        <Legend dataKey="actionUse" />
        <Tooltip />
        <Pie
          data={workflowUseCount.data}
          labelLine={false}
          label={renderCustomizedLabel}
          fill="#8884d8"
          nameKey="actionUse"
          dataKey="useCount"
        >
          {
            workflowUseCount.data.map((entry, index) => <Cell key={`cell-${entry.actionUse}`} fill={COLORS[index % COLORS.length]} />)
          }
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};
const mapStateToProps = (state: AppState) => ({
  workflowUseCount: state.workflowUseCount,
});
const mapDispatchToProps = {
  fetchWorkflowUseCount: fetchWorkflowUseCountAction,
};
export default connect(mapStateToProps, mapDispatchToProps)(memo(WorkflowUseChart));

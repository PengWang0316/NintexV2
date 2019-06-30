import React, { useEffect, memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { red } from '@material-ui/core/colors';
import { Stars } from '@material-ui/icons';
import I18n from '@kevinwang0316/i18n';

import DashboardNumCard from './DashboardNumCard';
import { fetchWorkflowCount as fetchWorkflowCountAction } from '../../store/WorkflowCount/actions';
import { AppState } from '../../store/ConfigureStore';

interface Props {
  workflowCount: number | null;
  fetchWorkflowCount: () => void;
}

const useStyles = makeStyles({
  cardIcon: {
    fontSize: 36,
    color: red[500],
  },
});
let isFetching = false;

export const WorkflowCountCard = ({ workflowCount, fetchWorkflowCount }: Props) => {
  const classes = useStyles({});
  useEffect(() => {
    if (!workflowCount && !isFetching) {
      fetchWorkflowCount();
      isFetching = true;
    }
  });

  return <DashboardNumCard displayNum={workflowCount} title={I18n.get('cardTitleTotalWorkflows')} icon={<Stars className={classes.cardIcon} />} />;
};

const mapStateToProps = (state: AppState) => ({ workflowCount: state.workflowCount });
const mapDispatchToProps = { fetchWorkflowCount: fetchWorkflowCountAction };
export default connect(mapStateToProps, mapDispatchToProps)(memo(WorkflowCountCard));

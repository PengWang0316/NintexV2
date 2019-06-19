import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { red } from '@material-ui/core/colors';
import { Stars } from '@material-ui/icons';
import I18n from '@kevinwang0316/i18n';

import DashboardNumCard from './DashboardNumCard';
import { fetchWorkflowCount as fetchWorkflowCountAction } from '../../actions/WorkflowActions';

const styles = {
  cardIcon: {
    fontSize: 36,
    color: red[500],
  },
};
let isFetching;

export const WorkflowCountCard = ({ classes, workflowCount, fetchWorkflowCount }) => {
  useEffect(() => {
    if (!workflowCount && !isFetching) {
      fetchWorkflowCount();
      isFetching = true;
    }
  });

  return <DashboardNumCard displayNum={workflowCount} title={I18n.get('cardTitleTotalWorkflows')} icon={<Stars className={classes.cardIcon} />} />;
};

WorkflowCountCard.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  workflowCount: PropTypes.number,
  fetchWorkflowCount: PropTypes.func.isRequired,
};
WorkflowCountCard.defaultProps = {
  workflowCount: null,
};
const mapStateToProps = state => ({ workflowCount: state.workflowCount });
const mapDispatchToProps = { fetchWorkflowCount: fetchWorkflowCountAction };
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(WorkflowCountCard));

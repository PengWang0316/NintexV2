import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { red } from '@material-ui/core/colors';
import { Stars } from '@material-ui/icons';
import I18n from '@kevinwang0316/i18n';

import DashboardNumCard from './DashboardNumCard';
import { fetchWorkflowsCount as fetchWorkflowsCountAction } from '../../actions/WorkflowActions';

const styles = {
  cardIcon: {
    fontSize: 36,
    color: red[500],
  },
};

export const WorkflowCountCard = ({ classes, workflowsCount, fetchWorkflowsCount }) => {
  useEffect(() => {
    if (!workflowsCount) fetchWorkflowsCount();
  });

  return <DashboardNumCard displayNum={workflowsCount} title={I18n.get('cardTitleTotalWorkflows')} icon={<Stars className={classes.cardIcon} />} />;
};

WorkflowCountCard.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  workflowsCount: PropTypes.number,
  fetchWorkflowsCount: PropTypes.func.isRequired,
};
WorkflowCountCard.defaultProps = {
  workflowsCount: null,
};
const mapStateToProps = state => ({ workflowsCount: state.workflowsCount });
const mapDispatchToProps = { fetchWorkflowsCount: fetchWorkflowsCountAction };
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(WorkflowCountCard));

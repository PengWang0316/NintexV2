/* eslint-disable react/jsx-one-expression-per-line */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { lightBlue, red, lightGreen } from '@material-ui/core/colors';
import { SwapVerticalCircle } from '@material-ui/icons';
import { Box } from '@material-ui/core';
import I18n from '@kevinwang0316/i18n';

import DashboardNumCard from './DashboardNumCard';
import { fetchInstanceStatus as fetchInstanceStatusAction } from '../../actions/InstanceActions';

const styles = {
  cardIcon: {
    fontSize: 36,
    color: lightBlue[500],
  },
  flexDiv: { display: 'flex' },
  box: { marginRight: 10 },
};

export const HealthScoreCard = ({ classes, instanceStatus, fetchInstanceStatus }) => {
  useEffect(() => {
    if (!instanceStatus) fetchInstanceStatus();
  });

  return (
    <DashboardNumCard
      displayNum={instanceStatus ? instanceStatus.completedPercentage : null}
      title={I18n.get('cardTitleWorkflowHealth')}
      icon={<SwapVerticalCircle className={classes.cardIcon} />}
      extraContent={(
        <div className={classes.flexDiv}>
          <Box className={classes.box} fontSize={14} color={red[500]}>Failed: {instanceStatus ? instanceStatus.failedPercentage : '--'}</Box>
          <Box fontSize={14} color={lightGreen[500]}>Started: {instanceStatus ? instanceStatus.startedPercentage : '--'}</Box>
        </div>
      )}
    />
  );
};

HealthScoreCard.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  instanceStatus: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string])),
  fetchInstanceStatus: PropTypes.func.isRequired,
};
HealthScoreCard.defaultProps = {
  instanceStatus: null,
};
const mapStateToProps = state => ({ instanceStatus: state.instanceStatus });
const mapDispatchToProps = { fetchInstanceStatus: fetchInstanceStatusAction };
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(HealthScoreCard));

/* eslint-disable react/jsx-one-expression-per-line */
import React, { useEffect, memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { lightBlue, red, lightGreen } from '@material-ui/core/colors';
import { SwapVerticalCircle } from '@material-ui/icons';
import { Box } from '@material-ui/core';
import I18n from '@kevinwang0316/i18n';

import DashboardNumCard from './DashboardNumCard';
import { fetchInstanceStatus as fetchInstanceStatusAction } from '../../store/InstanceStatus/actions';
import { AppState } from '../../store/ConfigureStore';

const useStyles = makeStyles({
  cardIcon: {
    fontSize: 36,
    color: lightBlue[500],
  },
  flexDiv: { display: 'flex' },
  box: { marginRight: 10 },
});
let isFetching = false;

interface Props {
  instanceStatus: {
    completedPercentage: string | number | null;
    failedPercentage: string | number;
    startedPercentage: string | number;
  };
  fetchInstanceStatus: () => void;
}

export const HealthScoreCard = ({ instanceStatus, fetchInstanceStatus }: Props) => {
  const classes = useStyles({});
  useEffect(() => {
    if (!instanceStatus && !isFetching) {
      fetchInstanceStatus();
      isFetching = true;
    }
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

const mapStateToProps = (state: AppState) => ({ instanceStatus: state.instanceStatus });
const mapDispatchToProps = { fetchInstanceStatus: fetchInstanceStatusAction };
export default connect(mapStateToProps, mapDispatchToProps)(memo(HealthScoreCard));

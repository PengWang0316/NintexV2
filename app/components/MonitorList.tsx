import React, { memo, ReactElement } from 'react';
import { connect } from 'react-redux';
import { Typography, Paper } from '@material-ui/core';
import I18n from '@kevinwang0316/i18n';
import { makeStyles } from '@material-ui/core/styles';

import MonitorListItem from './MonitorListItem';
import { Workflows } from '../store/Workflows/types';
import { MonitorListType } from '../store/MonitorList/types';
import { AppState } from '../store/ConfigureStore';

interface Props {
  workflows: Workflows;
  monitorList: MonitorListType;
}

const useStyles = makeStyles({
  rootPaper: {
    width: '100%',
    padding: 15,
  },
});

export const MonitorList = ({ workflows, monitorList }: Props): ReactElement => {
  const classes = useStyles({});
  return (
    <Paper className={classes.rootPaper}>
      <Typography variant="h5" component="h4">
        {I18n.get('monitorListTitle')}
      </Typography>
      {workflows.isFetched && Object.keys(monitorList.data).map(wfId => (
        <MonitorListItem
          key={wfId}
          wfId={wfId}
          workflows={workflows}
          monitorList={monitorList}
        />
      ))}
    </Paper>
  );
};
const mapStateToProps = ({ workflows, monitorList }: AppState) => ({ workflows, monitorList });
export default connect(mapStateToProps, null)(memo(MonitorList));

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Typography, Paper } from '@material-ui/core';
import I18n from '@kevinwang0316/i18n';
import { makeStyles } from '@material-ui/core/styles';

import MonitorListItem from './MonitorListItem';

const useStyles = makeStyles({
  rootPaper: {
    width: '100%',
    padding: 15,
  },
});

export const MonitorList = ({ workflows, monitorList }) => {
  const classes = useStyles();
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
MonitorList.propTypes = {
  workflows: PropTypes.objectOf(PropTypes.any).isRequired,
  monitorList: PropTypes.objectOf(PropTypes.any).isRequired,
};
const mapStateToProps = state => ({ ...state });
export default connect(mapStateToProps, null)(MonitorList);

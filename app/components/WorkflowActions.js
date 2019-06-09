/* eslint-disable no-underscore-dangle */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {
  PlayCircleFilled, PauseCircleFilled, ScreenShare, Unarchive, DeleteForever,
} from '@material-ui/icons';

const useStyles = makeStyles({
  rootDiv: {
    display: 'flex',
    flexWrap: 'wrap',
  },
});

export const WorkflowActions = ({ cell, workflows }) => {
  const classes = useStyles();
  return (
    <div className={classes.rootDiv}>
      {workflows && cell && workflows[cell._cell.row.data.workflowId].tenant && (
        <Fragment>
          <IconButton size="small"><PlayCircleFilled fontSize="inherit" /></IconButton>
          <IconButton size="small"><ScreenShare fontSize="inherit" /></IconButton>
          <IconButton size="small"><Unarchive fontSize="inherit" /></IconButton>
          <IconButton size="small"><DeleteForever fontSize="inherit" /></IconButton>
        </Fragment>
      )}
    </div>
  );
};
WorkflowActions.propTypes = {
  cell: PropTypes.objectOf(PropTypes.any),
  workflows: PropTypes.objectOf(PropTypes.any),
};
WorkflowActions.defaultProps = { cell: null, workflows: null };
export default WorkflowActions;

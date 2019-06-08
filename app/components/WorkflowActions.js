import React from 'react';
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

export const WorkflowActions = ({ cell }) => {
  const classes = useStyles();
  return (
    <div className={classes.rootDiv}>
      <IconButton size="small"><PlayCircleFilled fontSize="inherit" /></IconButton>
      <IconButton size="small"><ScreenShare fontSize="inherit" /></IconButton>
      <IconButton size="small"><Unarchive fontSize="inherit" /></IconButton>
      <IconButton size="small"><DeleteForever fontSize="inherit" /></IconButton>
    </div>
  );
};
WorkflowActions.propTypes = {
  cell: PropTypes.objectOf(PropTypes.any).isRequired,
};
export default WorkflowActions;

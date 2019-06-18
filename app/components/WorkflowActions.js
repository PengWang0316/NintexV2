/* eslint-disable no-underscore-dangle */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { IconButton, Tooltip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {
  PlayCircleFilled, PauseCircleFilled, ScreenShare, Unarchive, DeleteForever, Visibility,
} from '@material-ui/icons';
import {
  red, orange, lime, blue, brown, grey,
} from '@material-ui/core/colors';
import I18n from '@kevinwang0316/i18n';

const useStyles = makeStyles({
  rootDiv: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  runIcon: { color: lime[600] },
  stopIcon: { color: orange[600] },
  shareIcon: { color: blue[600] },
  moveIcon: { color: brown[600] },
  deleteIcon: { color: red[600] },
  monitorIconActive: { color: orange[500] },
  monitorIconDeactive: { color: grey[400] },
});

export const WorkflowActions = ({
  cell, handleRun, handleStop, handleExport, handleMove,
  handleDelete, handleMonitor,
}) => {
  const classes = useStyles();

  const handleRunClick = () => handleRun(cell._cell.row.data.workflowId, cell._cell.row.data.tenant);
  const handleStopClick = () => handleStop(cell._cell.row.data.workflowId, cell._cell.row.data.tenant);
  const handleExportClick = () => handleExport(cell._cell.row.data.workflowId, cell._cell.row.data.tenant);
  const handleMoveClick = () => handleMove(cell._cell.row.data.workflowId, cell._cell.row.data.tenant);
  const handleDeleteClick = () => handleDelete(cell._cell.row.data.workflowId, cell._cell.row.data.tenant);
  const handleMonitorClick = () => handleMonitor(
    cell._cell.row.data.workflowId,
    cell._cell.row.data.tenant,
    cell._cell.row.data.isMonitored === 0 ? 1 : 0,
  );

  return (
    <div className={classes.rootDiv}>
      {cell && cell._cell.value !== undefined && (
        <Fragment>
          <Tooltip title={I18n.get('actionMonitor')} placement="top-end"><IconButton size="small" onClick={handleMonitorClick}><Visibility className={cell._cell.row.data.isMonitored ? classes.monitorIconActive : classes.monitorIconDeactive} fontSize="inherit" /></IconButton></Tooltip>
          {cell._cell.value === 0 && <Tooltip title={I18n.get('actionRun')} placement="top-end"><IconButton size="small" onClick={handleRunClick}><PlayCircleFilled className={classes.runIcon} fontSize="inherit" /></IconButton></Tooltip>}
          {cell._cell.value === 1 && <Tooltip title={I18n.get('actionStop')} placement="top-end"><IconButton size="small" onClick={handleStopClick}><PauseCircleFilled className={classes.stopIcon} fontSize="inherit" /></IconButton></Tooltip>}
          <Tooltip title={I18n.get('actionExport')} placement="top-end"><IconButton size="small" onClick={handleExportClick}><ScreenShare className={classes.shareIcon} fontSize="inherit" /></IconButton></Tooltip>
          <Tooltip title={I18n.get('actionMove')} placement="top-end"><IconButton size="small" onClick={handleMoveClick}><Unarchive className={classes.moveIcon} fontSize="inherit" /></IconButton></Tooltip>
          <Tooltip title={I18n.get('actionDelete')} placement="top-end"><IconButton size="small" onClick={handleDeleteClick}><DeleteForever className={classes.deleteIcon} fontSize="inherit" /></IconButton></Tooltip>
        </Fragment>
      )}
    </div>
  );
};
WorkflowActions.propTypes = {
  cell: PropTypes.objectOf(PropTypes.any),
  handleRun: PropTypes.func.isRequired,
  handleStop: PropTypes.func.isRequired,
  handleExport: PropTypes.func.isRequired,
  handleMove: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleMonitor: PropTypes.func.isRequired,
};
WorkflowActions.defaultProps = { cell: null };
export default WorkflowActions;

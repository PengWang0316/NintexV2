import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import {
  List, ListItem, Divider, ListItemText, Typography, ListItemIcon, Collapse,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {
  CheckCircle as CheckIcon, Warning as WarningIcon, ExpandLess, ExpandMore,
} from '@material-ui/icons';
import { amber, lightGreen } from '@material-ui/core/colors';

const useStyles = makeStyles(theme => ({
  rootPaper: {
    width: '100%',
    padding: 15,
  },
  list: {
    width: '100%',
  },
  inline: {
    display: 'inline',
  },
  warningIcon: { color: amber[500] },
  checkIcon: { color: lightGreen[400] },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

export const MonitorListItem = ({ wfId, workflows, monitorList }) => {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);

  const handleExpendClick = () => setIsOpen(state => !state);

  return (
    <List className={classes.list}>
      <ListItem alignItems="center" button onClick={handleExpendClick}>
        <ListItemIcon>
          <Fragment>
            {monitorList.data[wfId].hasFailure && <WarningIcon fontSize="large" className={classes.warningIcon} />}
            {!monitorList.data[wfId].hasFailure && <CheckIcon fontSize="large" className={classes.checkIcon} />}
          </Fragment>
        </ListItemIcon>
        <ListItemText
          primary={workflows.data[wfId].workflowName}
          secondary={(
            <Fragment>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                {workflows.data[wfId].publisher}
              </Typography>
            </Fragment>
          )}
        />
        {isOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={isOpen} timeout="auto" unmountOnExit>
        {monitorList.data[wfId] && Object.keys(monitorList.data[wfId].instances).map(instanceId => (
          <List component="div" disablePadding key={instanceId}>
            <ListItem button className={classes.nested}>
              <ListItemIcon>
                <Fragment>
                  {monitorList.data[wfId].instances[instanceId].status === 'Failed' && <WarningIcon className={classes.warningIcon} />}
                  {monitorList.data[wfId].instances[instanceId].status === 'Completed' && <CheckIcon className={classes.checkIcon} />}
                </Fragment>
              </ListItemIcon>
              <ListItemText
                primary={`${monitorList.data[wfId].instances[instanceId].status} - ${monitorList.data[wfId].instances[instanceId].startTime}`}
              />
            </ListItem>
          </List>
        ))}
      </Collapse>
      <Divider variant="inset" component="li" />
    </List>
  );
};
MonitorListItem.propTypes = {
  workflows: PropTypes.objectOf(PropTypes.any).isRequired,
  monitorList: PropTypes.objectOf(PropTypes.any).isRequired,
  wfId: PropTypes.string.isRequired,
};
export default MonitorListItem;

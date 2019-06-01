import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import {
  Drawer, List, Divider, ListItem, ListItemIcon, ListItemText, Tooltip,
} from '@material-ui/core';
import { Dashboard as DashBoardIcon, CloudUpload as UploadFileIcon, List as WorkflowManagerIcon } from '@material-ui/icons';
import I18n from '@kevinwang0316/i18n';
import { indigo, blue, amber } from '@material-ui/core/colors';

import FileUploadDialog from './FileUploadDialog';
import { HOME_PAGE_URL, WORKFLOW_MANAGER_PAGE_URL } from '../config';

const styles = theme => ({
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(7) + 1,
    },
  },
  list: {
    paddingTop: 80,
  },
  dashboardIcon: {
    color: indigo[500],
  },
  workflowManagerIcon: {
    color: blue[500],
  },
  fileUploadIcon: {
    color: amber[300],
  },
});

const MenuDrawer = ({ classes }) => {
  const [isOpenFileUpload, setIsOpenFileUpload] = useState(false);

  const handleUploadFileBtn = () => setIsOpenFileUpload(state => !state);

  return (
    <Fragment>
      <Drawer
        variant="permanent"
        className={classes.drawerClose}
        classes={{
          paper: classes.drawerClose,
        }}
        open={false}
      >
        <List className={classes.list}>
          <Link to={HOME_PAGE_URL}>
            <Tooltip title={I18n.get('dashboard')} placement="right-end">
              <ListItem button>
                <ListItemIcon><DashBoardIcon className={classes.dashboardIcon} /></ListItemIcon>
                <ListItemText primary={I18n.get('dashboard')} />
              </ListItem>
            </Tooltip>
          </Link>
          <Link to={WORKFLOW_MANAGER_PAGE_URL}>
            <Tooltip title={I18n.get('workflowManager')} placement="right-end">
              <ListItem button>
                <ListItemIcon>
                  <WorkflowManagerIcon className={classes.workflowManagerIcon} />
                </ListItemIcon>
                <ListItemText primary={I18n.get('workflowManager')} />
              </ListItem>
            </Tooltip>
          </Link>
        </List>
        <Divider />
        <List>
          <Tooltip title={I18n.get('uploadFile')} placement="right-end">
            <ListItem button onClick={handleUploadFileBtn}>
              <ListItemIcon><UploadFileIcon className={classes.fileUploadIcon} /></ListItemIcon>
              <ListItemText primary={I18n.get('uploadFile')} />
            </ListItem>
          </Tooltip>
        </List>
      </Drawer>
      <FileUploadDialog open={isOpenFileUpload} handleClose={handleUploadFileBtn} />
    </Fragment>
  );
};

MenuDrawer.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};
export default withStyles(styles)(MenuDrawer);

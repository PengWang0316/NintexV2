import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import {
  Drawer, List, Divider, ListItem, ListItemIcon, ListItemText, Tooltip,
} from '@material-ui/core';
import {
  Dashboard as DashBoardIcon, CloudUpload as UploadFileIcon, Visibility as MonitorCenterIcon,
  List as WorkflowManagerIcon, Queue as AddTagIcon, VpnKey as KeyIcon,
} from '@material-ui/icons';
import I18n from '@kevinwang0316/i18n';
import {
  indigo, blue, amber, teal,
} from '@material-ui/core/colors';

import FileUploadDialog from './FileUploadDialog';
import AddTagDialog from './AddTagDialog';
import KeyManageDialog from './KeyManageDialog';
import { HOME_PAGE_URL, WORKFLOW_MANAGER_PAGE_URL, MONITOR_CENTER_PAGE_URL } from '../config';

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
    color: indigo[400],
  },
  workflowManagerIcon: {
    color: blue[500],
  },
  monitorCenterIcon: {
    color: teal[400],
  },
  fileUploadIcon: {
    color: amber[300],
  },
  addTagIcon: {
    color: amber[900],
  },
  keyIcon: {
    color: blue[900],
  },
});

const MenuDrawer = ({ classes }) => {
  const [isOpenFileUpload, setIsOpenFileUpload] = useState(false);
  const [isOpenAddTag, setIsOpenAddTag] = useState(false);
  const [isOpenKeyManage, setIsOpenKeyManage] = useState(false);

  const handleUploadFileBtn = () => setIsOpenFileUpload(state => !state);
  const handleAddTagBtn = () => setIsOpenAddTag(state => !state);
  const handleKeyBtn = () => setIsOpenKeyManage(state => !state);

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
          <Link to={MONITOR_CENTER_PAGE_URL}>
            <Tooltip title={I18n.get('monitorCenter')} placement="right-end">
              <ListItem button>
                <ListItemIcon>
                  <MonitorCenterIcon className={classes.monitorCenterIcon} />
                </ListItemIcon>
                <ListItemText primary={I18n.get('monitorCenter')} />
              </ListItem>
            </Tooltip>
          </Link>
          <Divider />
          <Tooltip title={I18n.get('keyManage')} placement="right-end">
            <ListItem button onClick={handleKeyBtn}>
              <ListItemIcon><KeyIcon className={classes.keyIcon} /></ListItemIcon>
              <ListItemText primary={I18n.get('keyManage')} />
            </ListItem>
          </Tooltip>
          <Tooltip title={I18n.get('createTag')} placement="right-end">
            <ListItem button onClick={handleAddTagBtn}>
              <ListItemIcon><AddTagIcon className={classes.addTagIcon} /></ListItemIcon>
              <ListItemText primary={I18n.get('createTag')} />
            </ListItem>
          </Tooltip>
          <Tooltip title={I18n.get('uploadFile')} placement="right-end">
            <ListItem button onClick={handleUploadFileBtn}>
              <ListItemIcon><UploadFileIcon className={classes.fileUploadIcon} /></ListItemIcon>
              <ListItemText primary={I18n.get('uploadFile')} />
            </ListItem>
          </Tooltip>
        </List>
      </Drawer>
      <FileUploadDialog open={isOpenFileUpload} handleClose={handleUploadFileBtn} />
      <AddTagDialog open={isOpenAddTag} handleClose={handleAddTagBtn} />
      <KeyManageDialog open={isOpenKeyManage} handleClose={handleKeyBtn} />
    </Fragment>
  );
};

MenuDrawer.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};
export default withStyles(styles)(MenuDrawer);

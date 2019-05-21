import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  Drawer, List, Divider, ListItem, ListItemIcon, ListItemText,
} from '@material-ui/core';
import { Dashboard as DashBoardIcon, CloudUpload as UploadFileIcon, List as WorkflowManagerIcon } from '@material-ui/icons';
import I18n from '@kevinwang0316/i18n';
import { indigo, blue, amber } from '@material-ui/core/colors';

const styles = theme => ({
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing.unit * 7 + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9 + 1,
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

const MenuDrawer = ({ classes }) => (
  <Drawer
    variant="permanent"
    className={classes.drawerClose}
    classes={{
      paper: classes.drawerClose,
    }}
    open={false}
  >
    <List className={classes.list}>
      <ListItem button>
        <ListItemIcon><DashBoardIcon className={classes.dashboardIcon} /></ListItemIcon>
        <ListItemText primary={I18n.get('dashboard')} />
      </ListItem>
      <ListItem button>
        <ListItemIcon><WorkflowManagerIcon className={classes.workflowManagerIcon} /></ListItemIcon>
        <ListItemText primary={I18n.get('workflowManager')} />
      </ListItem>
    </List>
    <Divider />
    <List>
      <ListItem button>
        <ListItemIcon><UploadFileIcon className={classes.fileUploadIcon} /></ListItemIcon>
        <ListItemText primary={I18n.get('uploadFile')} />
      </ListItem>
    </List>
  </Drawer>
);
MenuDrawer.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};
export default withStyles(styles)(MenuDrawer);

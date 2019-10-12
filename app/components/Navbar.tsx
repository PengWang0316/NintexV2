/* eslint-disable react/destructuring-assignment */
import React, { Component, Fragment, ReactElement } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import {
  MenuItem, Menu, IconButton, Hidden, Button, Typography,
  Toolbar, AppBar, Avatar, Switch, FormControlLabel,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import { orange, green } from '@material-ui/core/colors';
// import { Auth } from 'aws-amplify';
import I18n from '@kevinwang0316/i18n';

import {
  HOME_PAGE_URL, SIGNIN_PAGE_URL,
} from '../config';
import * as UserActions from '../store/User/actions';
import { fetchTags as fetchTagsAction } from '../store/Tags/actions';
import { addNwcWorkflows as addNwcWorkflowsAction } from '../store/Workflows/actions';
import { Workflows } from '../store/Workflows/types';
import { TagsType } from '../store/Tags/types';
import { NWCKeysType } from '../store/NWCKeys/types';
import { UserType } from '../store/User/types';

/* istanbul ignore next */
const styles = theme => ({
  link: {
    color: theme.palette.primary.contrastText,
    textDecoration: 'none',
  },
  menuLink: {
    textDecoration: 'none',
  },
  flex1: {
    flex: 1,
  },
  appbar: {
    maxHeight: 55,
    position: 'sticky',
    top: 0,
    zIndex: theme.zIndex.drawer + 1,
  },
  avatar: {
    width: 26,
    height: 26,
    marginRight: 8,
    color: '#fff',
    backgroundColor: orange[800],
  },
  switchBase: {
    color: 'white',
    '&$checked': {
      color: green[400],
    },
    '&$checked + $track': {
      backgroundColor: green[400],
    },
  },
  checked: {},
  track: {},
});

interface PropType {
  classes: any;
  history: any;
  workflows: Workflows;
  user: UserType;
  logout: Function;
  currentAuthenticatedUser: Function;
  addNwcWorkflows: Function;
  fetchTags: Function;
  tags: TagsType;
  nwcKeys: NWCKeysType;
}
interface StateType {
  anchorEl: boolean;
  isAutoFetching: boolean;
}

/** Navbar component */
export class Navbar extends Component<PropType, StateType> {
  state = { anchorEl: null, isAutoFetching: false };

  private autoFetchJob: any = null;

  /**
   * Get the authentication user information.
   */
  componentDidMount() {
    this.props.currentAuthenticatedUser();
    if (!this.props.tags) this.props.fetchTags();
  }

  /**
   * Changing anchorEl state to an click target element or null.
   * @return {null} No Return.
   */
  handleMenuIconClick = ({ currentTarget }) => this.setState(({ anchorEl }) => ({
    anchorEl: anchorEl ? null : currentTarget,
  }));

  /**
   * Showing the login dialog when the user did not login and logout
   * a user if the user has already login.
   */
  handleLoginButtonClick = () => {
    const { history, user, logout } = this.props;
    if (user) {
      logout();
      history.push('/');
    } else history.push(SIGNIN_PAGE_URL);
  }

  handleAutoFetchingClick = () => {
    if (this.state.isAutoFetching && this.autoFetchJob) {
      clearInterval(this.autoFetchJob);
      this.autoFetchJob = null;
    } else {
      this.autoFetchJob = setInterval(this.autoFetch, 60000);
    }
    this.setState(({ isAutoFetching }) => ({ isAutoFetching: !isAutoFetching }));
  };

  autoFetch = () => {
    Object.keys(this.props.nwcKeys.data).forEach((tenant) => {
      this.props.addNwcWorkflows(tenant, this.props.nwcKeys.data[tenant][1], this.props.workflows.data);
    });
  };

  /**
   * The render method to render the jsx.
   * @return {jsx} Return jsx.
   */
  render(): ReactElement {
    const { classes, user, nwcKeys } = this.props;
    const { anchorEl, isAutoFetching } = this.state;
    return (
      <Fragment>
        <AppBar position="static" className={classes.appbar} data-testid="navbar">
          <Toolbar>
            <Link to={HOME_PAGE_URL} className={`${classes.link} ${classes.flex1}`} data-testid="titleLink">
              <Typography variant="h6" color="inherit">{I18n.get('appName')}</Typography>
            </Link>
            <Hidden only="xs">
              <FormControlLabel
                control={(
                  <Switch
                    checked={isAutoFetching}
                    onChange={this.handleAutoFetchingClick}
                    disabled={!nwcKeys.data}
                    classes={{
                      switchBase: classes.switchBase,
                      track: classes.track,
                      checked: classes.checked,
                    }}
                  />
                )}
                label="Auto Fetching"
              />
              <Button color="inherit" onClick={this.handleLoginButtonClick} data-testid="loginButton">
                {user ? (
                  <Fragment>
                    <Avatar className={classes.avatar}><Typography color="inherit">{user.nickname.charAt(0)}</Typography></Avatar>
                    <Typography color="inherit">{I18n.get('logout')}</Typography>
                  </Fragment>
                ) : I18n.get('login')}
              </Button>
            </Hidden>
            <Hidden only={['xl', 'lg', 'md', 'sm']}>
              <IconButton
                color="inherit"
                aria-label="Menu"
                onClick={this.handleMenuIconClick}
                aria-owns={anchorEl ? 'simple-menu' : null}
                aria-haspopup="true"
                data-testid="navbarDropMenuButton"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={this.handleMenuIconClick}
                data-testid="dropDownMenu"
              >
                <MenuItem>
                  <FormControlLabel
                    control={(
                      <Switch
                        checked={isAutoFetching}
                        onChange={this.handleAutoFetchingClick}
                        disabled={!nwcKeys}
                        classes={{
                          switchBase: classes.switchBase,
                          track: classes.track,
                          checked: classes.checked,
                        }}
                      />
                    )}
                    label="Auto Fetching"
                  />
                </MenuItem>
                <MenuItem onClick={this.handleLoginButtonClick} data-testid="loginMenu">
                  {user ? (
                    <Fragment>
                      <Avatar className={classes.avatar}><Typography color="inherit">{user.nickname.charAt(0)}</Typography></Avatar>
                      <Typography color="textPrimary">{I18n.get('logout')}</Typography>
                    </Fragment>
                  ) : I18n.get('login')}
                </MenuItem>
              </Menu>
            </Hidden>
          </Toolbar>
        </AppBar>
      </Fragment>
    );
  }
}

/* istanbul ignore next */
const mapStateToProps = ({
  user, tags, nwcKeys, workflows,
}) => ({
  user, tags, nwcKeys, workflows,
});
/* istanbul ignore next */
const mapDispatchToProps = dispatch => ({
  currentAuthenticatedUser: () => dispatch(UserActions.currentAuthenticatedUser()),
  logout: () => dispatch(UserActions.logout()),
  fetchTags: () => dispatch(fetchTagsAction()),
  addNwcWorkflows: (tenant, key, exsitedWorkflows) => dispatch(addNwcWorkflowsAction(tenant, key, exsitedWorkflows, true)),
});

/* Putting the withRouter to the first position because when test code mocks Link
the withRouter also has to be mocked. But it is hard to really return a react
component to satisfy the whole chain call. */
// @ts-ignore
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Navbar)));

import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  MenuItem, Menu, IconButton, Hidden, Button, Typography, Toolbar, AppBar, Avatar,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import orange from '@material-ui/core/colors/orange';
// import { Auth } from 'aws-amplify';
import I18n from '@kevinwang0316/i18n';

import {
  HOME_PAGE_URL, WORKFLOW_MANAGER_PAGE_URL, SIGNIN_PAGE_URL,
} from '../config';
import * as UserActions from '../actions/UserActions';

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
});

/** Navbar component */
export class Navbar extends Component {
  static propTypes = {
    classes: PropTypes.objectOf(PropTypes.string).isRequired,
    history: PropTypes.objectOf(PropTypes.any).isRequired,
    user: PropTypes.object,
    logout: PropTypes.func.isRequired,
    currentAuthenticatedUser: PropTypes.func.isRequired,
  };

  static defaultProps = { user: null };

  state = { anchorEl: null };

  /**
   * Get the authentication user information.
   */
  componentDidMount() {
    // eslint-disable-next-line react/destructuring-assignment
    this.props.currentAuthenticatedUser();
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


  /**
   * The render method to render the jsx.
   * @return {jsx} Return jsx.
   */
  render() {
    const { classes, user } = this.props;
    const { anchorEl, isOpenFileUpload } = this.state;
    return (
      <Fragment>
        <AppBar position="static" className={classes.appbar} data-testid="navbar">
          <Toolbar>
            <Link to={HOME_PAGE_URL} className={`${classes.link} ${classes.flex1}`} data-testid="titleLink">
              <Typography variant="h6" color="inherit">{I18n.get('appName')}</Typography>
            </Link>
            <Hidden only="xs">
              {/* <Link to={HOME_PAGE_URL} className={classes.link}>
                <Button color="inherit" data-testid="dashboardButton">{I18n.get('dashboard')}</Button>
              </Link>
              <Link to={WORKFLOW_MANAGER_PAGE_URL} className={classes.link}>
                <Button color="inherit" data-testid="workflowManagerButton">{I18n.get('workflowManager')}</Button>
              </Link> */}
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
                {/* <MenuItem>
                  <Link to={HOME_PAGE_URL} className={classes.menuLink} data-testid="testLink">
                    <Typography color="textPrimary">{I18n.get('dashboard')}</Typography>
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link to={WORKFLOW_MANAGER_PAGE_URL} className={classes.menuLink} data-testid="testLink">
                    <Typography color="textPrimary">{I18n.get('workflowManager')}</Typography>
                  </Link>
                </MenuItem> */}
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
const mapStateToProps = state => ({ user: state.user });
/* istanbul ignore next */
const mapDispatchToProps = dispatch => ({
  currentAuthenticatedUser: () => dispatch(UserActions.currentAuthenticatedUser()),
  logout: () => dispatch(UserActions.logout()),
});

/* Putting the withRouter to the first position because when test code mocks Link
the withRouter also has to be mocked. But it is hard to really return a react
component to satisfy the whole chain call. */
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Navbar)));

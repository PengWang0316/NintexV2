import React, { useEffect } from 'react';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import importedComponent from 'react-imported-component';
import CssBaseline from '@material-ui/core/CssBaseline';
import Amplify from 'aws-amplify';
import { withAuthenticator } from 'aws-amplify-react';

import Navbar from './Navbar';
import MenuDrawer from './MenuDrawer';
import { checkInstanceStatus as checkInstanceStatusAction } from '../store/MonitorList/actions';
import {
  HOME_PAGE_URL, WORKFLOW_MANAGER_PAGE_URL, SIGNIN_PAGE_URL,
  cognitoConfig, amplifyAuthSignOption, MONITOR_CENTER_PAGE_URL,
} from '../config';
import { MonitorListType, MonitorListData } from '../store/MonitorList/types';

Amplify.configure({
  Auth: cognitoConfig,
});

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#4A6572',
      main: '#344955',
      dark: '#232F34',
      contrastText: '#fff',
    },
    secondary: {
      light: '#497ca4',
      main: '#105075',
      dark: '#002884',
      contrastText: '#fff',
    },
  },
});

/* istanbul ignore next */
const HomePage = importedComponent(() => import(/* webpackChunkName: "HomePageContainer" *//* webpackPrefetch: true */ './containers/HomePageContainer').catch(err => console.log(err)));
const ManagementPage = importedComponent(() => import(/* webpackChunkName: "ManagementContainer" *//* webpackPrefetch: true */ './containers/ManagementContainer').catch(err => console.log(err)));
const MonitorPage = importedComponent(() => import(/* webpackChunkName: "MonitorContainer" *//* webpackPrefetch: true */ './containers/MonitorContainer').catch(err => console.log(err)));

const INTERVAL_TIME = 1 * 60 * 1000;
let autoMonitorJob = null;
interface PropType {
  monitorList: MonitorListType;
  checkInstanceStatus: (monitoredWorkflows: MonitorListData) => void;
}
/**
 * The root component that contains the theme, routers, navbar, and login dialog
 */
export const App = ({ monitorList, checkInstanceStatus }: PropType) => {
  useEffect(() => {
    if (Object.keys(monitorList.data).length !== 0) {
      if (autoMonitorJob) clearInterval(autoMonitorJob);
      autoMonitorJob = setInterval(() => checkInstanceStatus(monitorList.data), INTERVAL_TIME);
      // console.log('item changed, start a new job');
    } else if (autoMonitorJob && Object.keys(monitorList.data).length === 0) {
      if (autoMonitorJob) clearInterval(autoMonitorJob);
      autoMonitorJob = null;
      // console.log('empty list, stop job');
    }
  });
  return (
    <MuiThemeProvider theme={theme}>
      <Router>
        <div>
          <CssBaseline />
          <Navbar />
          <MenuDrawer />
          <main>
            <Switch>
              <Route exact path={HOME_PAGE_URL} component={HomePage} />
              <Route exact path={WORKFLOW_MANAGER_PAGE_URL} component={ManagementPage} />
              <Route exact path={MONITOR_CENTER_PAGE_URL} component={MonitorPage} />
              <Route exact path={SIGNIN_PAGE_URL} component={withAuthenticator(HomePage, amplifyAuthSignOption)} />
              <Route render={() => <p>Not Fount!</p>} />
            </Switch>
          </main>
        </div>
      </Router>
    </MuiThemeProvider>
  );
};
const mapStateToProps = ({ monitorList }: { monitorList: MonitorListType }) => ({ monitorList });
const mapDispatchToProps = {
  checkInstanceStatus: checkInstanceStatusAction,
};
export default connect(mapStateToProps, mapDispatchToProps)(App);

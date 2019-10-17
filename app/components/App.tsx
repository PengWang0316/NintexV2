import React, { Suspense, lazy } from 'react';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
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
const HomePage = lazy(() => import(/* webpackChunkName: "HomePageContainer" *//* webpackPrefetch: true */ './containers/HomePageContainer'));
/* istanbul ignore next */
const ManagementPage = lazy(() => import(/* webpackChunkName: "ManagementContainer" *//* webpackPrefetch: true */ './containers/ManagementContainer'));
/* istanbul ignore next */
const MonitorPage = lazy(() => import(/* webpackChunkName: "MonitorContainer" *//* webpackPrefetch: true */ './containers/MonitorContainer'));

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
  React.useEffect(() => {
    if (Object.keys(monitorList.data).length !== 0) {
      // item changed, start a new job
      if (autoMonitorJob) clearInterval(autoMonitorJob);
      autoMonitorJob = setInterval(() => checkInstanceStatus(monitorList.data), INTERVAL_TIME);
    } else if (autoMonitorJob && Object.keys(monitorList.data).length === 0) {
      // Stop the fetching job
      if (autoMonitorJob) clearInterval(autoMonitorJob);
      autoMonitorJob = null;
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
            <Suspense fallback={<div>Loading...</div>}>
              <Switch>
                <Route exact path={HOME_PAGE_URL} component={HomePage} />
                <Route exact path={WORKFLOW_MANAGER_PAGE_URL} component={ManagementPage} />
                <Route exact path={MONITOR_CENTER_PAGE_URL} component={MonitorPage} />
                <Route exact path={SIGNIN_PAGE_URL} component={withAuthenticator(HomePage, amplifyAuthSignOption)} />
                <Route render={() => <p>Not Fount!</p>} />
              </Switch>
            </Suspense>
          </main>
        </div>
      </Router>
    </MuiThemeProvider>
  );
};
/* istanbul ignore next */
const mapStateToProps = ({ monitorList }: { monitorList: MonitorListType }) => ({ monitorList });
/* istanbul ignore next */
const mapDispatchToProps = {
  checkInstanceStatus: checkInstanceStatusAction,
};
export default connect(mapStateToProps, mapDispatchToProps)(App);

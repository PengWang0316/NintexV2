
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import importedComponent from 'react-imported-component';
import CssBaseline from '@material-ui/core/CssBaseline';
import Amplify from 'aws-amplify';
import { withAuthenticator } from 'aws-amplify-react';

import Navbar from './Navbar';
import {
  HOME_PAGE_URL, TEST_PAGE_URL, SIGNIN_PAGE_URL, cognitoConfig, amplifyAuthSignOption,
} from '../config';
import LoadingAnimation from './SharedComponents/LoadingAnimation';

Amplify.configure({
  Auth: cognitoConfig,
});

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
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
const HomePage = importedComponent(() => import(/* webpackChunkName: "HomePageContainer" *//* webpackPrefetch: true */ './containers/HomePageContainer').catch(err => console.log(err)), { LoadingComponent: LoadingAnimation });
const TestPage = importedComponent(() => import(/* webpackChunkName: "TestPageContainer" *//* webpackPrefetch: true */ './containers/TestPageContainer').catch(err => console.log(err)), { LoadingComponent: LoadingAnimation });

/**
 * The root component that contains the theme, routers, navbar, and login dialog
 */
export default () => (
  <MuiThemeProvider theme={theme}>
    <Router>
      <div>
        <CssBaseline />
        <Navbar />
        <main>
          <Switch>
            <Route exact path={HOME_PAGE_URL} component={HomePage} />
            <Route exact path={TEST_PAGE_URL} component={TestPage} />
            <Route exact path={SIGNIN_PAGE_URL} component={withAuthenticator(HomePage, amplifyAuthSignOption)} />
            <Route render={() => <p>Not Fount!</p>} />
          </Switch>
        </main>
      </div>
    </Router>
  </MuiThemeProvider>
);

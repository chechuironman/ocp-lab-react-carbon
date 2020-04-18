import React, { Component } from 'react';
import './app.scss';
import { Content } from 'carbon-components-react/lib/components/UIShell';
import TutorialHeader from './components/TutorialHeader';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LandingPage from './content/LandingPage';
// import RepoPage from './content/RepoPage';
import RegisterPage from './content/RegisterPage';
import LoginPage from './content/LoginPage';
import ManagementPage from './content/ManagementPage';
import WorkspacePage from './content/WorkspacePage';
import PrivateRoute from './components/private-route/PrivateRoute';
// import Dashboard from "./components/dashboard/Dashboard";
import { Provider } from 'react-redux';
import store from './store';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';

// const pino = require('pino');
// const expressPino = require('express-pino-logger');

// const logger = pino({ level: process.env.LOG_LEVEL || 'info' });
// const expressLogger = expressPino({ logger });
// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = './login';
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <>
            <TutorialHeader />

            <Content>
              {/* <NotificationContainer /> */}
              <Route exact path="/" component={LandingPage} />
              <Route path="/register" component={RegisterPage} />
              <Route path="/login" component={LoginPage} />
              <Switch>
                <PrivateRoute
                  exact
                  path="/workspace"
                  component={WorkspacePage}
                />
                <PrivateRoute
                  exact
                  path="/management"
                  component={ManagementPage}
                />
              </Switch>
            </Content>
          </>
          <div className="bx--grid bx--grid--full-width landing-page"></div>
        </Router>
      </Provider>
    );
  }
}

export default App;

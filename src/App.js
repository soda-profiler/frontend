import React, { Component } from "react";

import DataTable from "./DataTable";
import TimeLineChart from "./TimeLine";
import LandingPage from "./LandingPage";

import { Router, Route, Link } from "react-router-dom";
import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect'
import { routerActions } from 'react-router-redux'
import history from './history'
import Dashboard from './Dashboard';

const UserScoped = connectedRouterRedirect({
  // The url to redirect user to if they fail
 redirectPath: '/welcome',
  // If selector is true, wrapper will not redirect
  // For example let's check that state contains user data
 authenticatedSelector: state => localStorage.getItem('token') != null,
 // A nice display name for this check
 wrapperDisplayName: 'UserIsAuthenticated'
})




class App extends Component {
  render() {
    return (
      <div className="App">
        <Router history={history}>
          <div>
            <Route path="/welcome/" exact component={LandingPage} />
            <Route path="/" exact  name="index" component={UserScoped(Dashboard)} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;

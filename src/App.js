import React from 'react';
import LoginPage from './pages/LoginPage';
import './App.css';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { history } from './helpers';
import HomePage from './pages/HomePage';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Router history={history}>
      <Switch>
        <PrivateRoute exact path="/" component={HomePage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/home" component={HomePage} />
        <Redirect from="*" to="/" />
      </Switch>
    </Router>
  );
}

export default App;

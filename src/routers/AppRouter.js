import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import HomePage from '../components/HomePage';
import LoginPage from '../components/LoginPage';
import NotFoundPage from '../components/NotFoundPage';
import PrivateRoute from '../routers/PrivateRoute';
import PublicRoute from '../routers/PublicRoute';
import AddIncomePage from '../components/AddIncomePage';
import AddExpensePage from '../components/AddExpensePage';
import AddGoalsPage from '../components/AddGoalsPage';
import ScenarioBuilder from '../components/ScenarioBuilder';

export const history = createHistory();

const AppRouter = () => (
  <Router history={history}>
    <div>
      <Switch>
        <PublicRoute path="/" component={LoginPage} exact={true} />
        <PrivateRoute path="/dashboard" component={HomePage} />
        <PrivateRoute path="/income" component={AddIncomePage} />
        <PrivateRoute path="/expenses" component={AddExpensePage} />
        <PrivateRoute path="/goals" component={AddGoalsPage} />
        <PrivateRoute path="/whatif" component={ScenarioBuilder} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </Router>
);

export default AppRouter;

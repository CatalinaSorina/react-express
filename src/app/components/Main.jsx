import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router';
import { store } from '../store';
import { history } from '../store/history';
import { ConnectedDashboard } from './Dashboard';
import { ConnectedNavigation } from './Navigation';
import { ConnectedTaskDetail } from './TaskDetail';

export const Main = () => (
  <Router history={history}>
    <Provider store={store}>
      <ConnectedNavigation />
      <Route exact path='/dashboard' render={() => <ConnectedDashboard />} />
      <Route
        exact
        path='/task/:id'
        render={({ match }) => <ConnectedTaskDetail match={match} />}
      />
    </Provider>
  </Router>
);

import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, Redirect } from 'react-router';
import { store } from '../store';
import { history } from '../store/history';
import { ConnectedDashboard } from './Dashboard';
import { ConnectedLogin } from './Login';
import { ConnectedNavigation } from './Navigation';
import { ConnectedTaskDetail } from './TaskDetail';

const RouteGuard = Component => ({ match }) => {
  console.log('Route guard', match);
  if (!store.getState().session.authenticated) {
    // reroute
    return <Redirect to='/' />;
  }
  return <Component match={match} />;
};
export const Main = () => (
  <Router history={history}>
    <Provider store={store}>
      <ConnectedNavigation />
      <Route exact path='/' component={ConnectedLogin} />
      <Route exact path='/dashboard' render={RouteGuard(ConnectedDashboard)} />
      <Route exact path='/task/:id' render={RouteGuard(ConnectedTaskDetail)} />
    </Provider>
  </Router>
);

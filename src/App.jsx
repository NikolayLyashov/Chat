import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import routes from '../assets/routes';
import { Home } from './pages/Home';
import { Login } from './pages/Login';

export const App = () => (
  <Switch>
    <Route path={routes.login}>
      <Login />
    </Route>
    <Route path={routes.home()}>
      {localStorage.getItem('token') ? <Home /> : <Redirect to="/login" />}
    </Route>
  </Switch>
);

export default App;

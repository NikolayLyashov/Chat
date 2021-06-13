import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Home } from './pages/Home';
import { Login } from './pages/Login';

export const App = () => (
  <Switch>
    <Route path="/login">
      <Login />
    </Route>
    <Route path="/">
      {localStorage.getItem('token') ? <Home /> : <Redirect to="/login" />}
    </Route>
  </Switch>
);

export default App;

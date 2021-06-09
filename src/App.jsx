import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Login } from './pages/Login';

export const App = () => (
  <Switch>
    <Route path="/login">
      <Login />
    </Route>
    <Route path="/">
      <Home />
    </Route>
  </Switch>
);

export default App;

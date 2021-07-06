import React, { useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import routes from './routes';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { Navigation } from './components/Navigation';
import AuthorizationContext from './context/AuthorizationContext';

export const App = () => {
  const [authorization, setAuthorization] = useState('init');

  return (
    <div className="d-flex flex-column h-100">
      <>
        <AuthorizationContext.Provider value={{ authorization, setAuthorization }}>
          <Navigation />
          <Switch>
            <Route path="/signup">
              <Signup />
            </Route>
            <Route path={routes.login}>
              <Login />
            </Route>
            <Route path="/">
              {localStorage.getItem('token') ? <Home /> : <Redirect to="/login" />}
            </Route>
          </Switch>
        </AuthorizationContext.Provider>
      </>
    </div>
  );
};

export default App;

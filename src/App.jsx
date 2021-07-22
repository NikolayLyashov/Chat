/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import {
  Switch,
  Route,
  Redirect,
  BrowserRouter,
} from 'react-router-dom';
import routes from './routes';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { Navigation } from './components/Navigation';
import AuthorizationContext from './context/AuthorizationContext.js';
import useAuthorizationData from './useAuthorizationData';

const AuthProvider = ({ children }) => {
  const [userAuthName, setUserAuthName] = useState();
  const [userAuth, setUserAuth] = useState();
  const [authorization, setAuthorization] = useState('init');

  const logOut = () => {
    localStorage.clear();
    setUserAuth(null);
  };

  const setAuth = (data) => {
    const { username, token } = data;

    localStorage.setItem('username', username);
    localStorage.setItem('token', token);

    setUserAuthName(localStorage.getItem('username'));
    setUserAuth(localStorage.getItem('token'));
  };

  return (
    <AuthorizationContext.Provider
      value={{
        userAuth,
        setUserAuth,
        authorization,
        setAuthorization,
        setAuth,
        userAuthName,
        setUserAuthName,
        logOut,
      }}
    >
      {children}
    </AuthorizationContext.Provider>
  );
};

export const App = () => {
  const PrivateRoute = ({ children }) => {
    const { userAuth } = useAuthorizationData();

    return (userAuth ? children : <Redirect to={routes.login} />);
  };
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="d-flex flex-column h-100">
          <Navigation />
          <Switch>
            <Route path={routes.signup}>
              <Signup />
            </Route>
            <Route path={routes.login}>
              <Login />
            </Route>
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          </Switch>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;

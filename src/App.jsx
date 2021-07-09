/* eslint-disable object-curly-newline */
/* eslint-disable react/prop-types */
import React, { useContext, useState } from 'react';
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
  const userToken = localStorage.getItem('token');
  const [userAuth, setUserAuth] = useState(userToken || null);
  const [authorization, setAuthorization] = useState('init');

  return (
    <AuthorizationContext.Provider
      value={{ userAuth, setUserAuth, authorization, setAuthorization }}
    >
      {children}
    </AuthorizationContext.Provider>
  );
};

// const useAuthorizationData = () => useContext(AuthorizationContext);

export const App = () => {
  const PrivateRoute = ({ children }) => {
    const { userAuth } = useAuthorizationData();
    return (userAuth ? children : <Redirect to="/login" />);
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

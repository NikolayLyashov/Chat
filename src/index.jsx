// @ts-check
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App';
import '../assets/application.scss';
import 'core-js/stable/index';
import 'regenerator-runtime/runtime';
import AuthorizationContext from '../assets/context';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const Main = () => {
  const [authorization, setAuthorization] = useState('init');
  return (
    <React.StrictMode>
      <BrowserRouter>
        <AuthorizationContext.Provider value={{ authorization, setAuthorization }}>
          <App />
        </AuthorizationContext.Provider>
      </BrowserRouter>
    </React.StrictMode>
  );
};

ReactDOM.render(
  <Main />,
  document.getElementById('chat'),
);

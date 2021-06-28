import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App';
import AuthorizationContext from './context';
import store from './store/store';
import { actions } from './store/slices';
import ApiContext from './apiContext';

const init = (socket) => {
  const Component = () => {
    socket.on('newMessage', (data) => {
      store.dispatch(actions.newMessage(data));
    });

    socket.on('newChannel', (data) => {
      store.dispatch(actions.newChannel(data));
    });

    socket.on('removeChannel', (data) => {
      store.dispatch(actions.removeChannel(data));
    });

    socket.on('renameChannel', (data) => {
      store.dispatch(actions.renameChannel(data));
      console.log(data);
    });

    const [authorization, setAuthorization] = useState('init');
    return (
      <React.StrictMode>
        <BrowserRouter>
          <AuthorizationContext.Provider value={{ authorization, setAuthorization }}>
            <Provider store={store}>
              <ApiContext.Provider value={socket}>
                <App />
              </ApiContext.Provider>
            </Provider>
          </AuthorizationContext.Provider>
        </BrowserRouter>
      </React.StrictMode>
    );
  };

  return <Component />;
};

export default init;

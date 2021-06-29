import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App';

import store from './store/store';
import { actions } from './store/slices';
import ApiContext from './context/apiContext';

const init = (socket) => {
  const Component = () => {
    socket.on('newMessage', (data) => {
      store.dispatch(actions.newMessage(data));
    });

    socket.on('newChannel', (data) => {
      store.dispatch(actions.newChannel(data));
      store.dispatch(actions.changeCurrentChannelID(data.id));
    });

    socket.on('removeChannel', (data) => {
      store.dispatch(actions.removeChannel(data));
    });

    socket.on('renameChannel', (data) => {
      store.dispatch(actions.renameChannel(data));
      console.log(data);
    });

    return (
      <React.StrictMode>
        <BrowserRouter>
          <Provider store={store}>
            <ApiContext.Provider value={socket}>
              <App />
            </ApiContext.Provider>
          </Provider>
        </BrowserRouter>
      </React.StrictMode>
    );
  };

  return <Component />;
};

export default init;

import React from 'react';
import { I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';

import i18n from './i18n';
import { App } from './App';
import store from './store/store';
import { actions } from './store/slices';
import ApiContext from './context/apiContext';

const init = (socket) => {
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
    store.dispatch(actions.changeCurrentChannelID(data.id));
  });

  const Component = () => (
    <React.StrictMode>
      <Provider store={store}>
        <ApiContext.Provider value={socket}>
          <I18nextProvider i18n={i18n}>
            <App />
          </I18nextProvider>
        </ApiContext.Provider>
      </Provider>
    </React.StrictMode>
  );

  return <Component />;
};

export default init;

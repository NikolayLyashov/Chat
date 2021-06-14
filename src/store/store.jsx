import { configureStore } from '@reduxjs/toolkit';
import channels from './channels';
import currentChannel from './currentChannel';

const store = configureStore({
  reducer: {
    channels,
    currentChannel,
  },
});

export default store;

/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const channelsSlice = createSlice({
  initialState: {
    channels: [],
    currentChannelId: null,
  },
  name: 'channels',
  reducers: {
    setInitialState(state, { payload }) {
      const { channels: receivedChannels, currentChannelId } = payload;
      state.channels = receivedChannels;
      state.currentChannelId = currentChannelId;
    },
    changeCurrentChannelID(state, { payload }) {
      state.currentChannelId = payload;
    },
    // addChannel(state, { payload }) {
    //   state.push(payload);
    // },
    // deletedChanel(state) {
    //   return state;
    // },
  },
});

export const { actions } = channelsSlice;

export default channelsSlice.reducer;
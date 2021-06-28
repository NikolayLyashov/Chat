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
    newChannel(state, { payload }) {
      state.channels.push(payload);
    },
    removeChannel(state, { payload }) {
      state.channels = state.channels.filter(({ id }) => id !== payload.id);
    },
    renameChannel(state, { payload }) {
      const { id: channelId, name } = payload;
      const modifiedChannel = state.channels.find(({ id }) => id === channelId);
      modifiedChannel.name = name;
    },
  },
});

export const { actions } = channelsSlice;

export default channelsSlice.reducer;

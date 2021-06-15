import { createSlice } from '@reduxjs/toolkit';

const currentChannel = createSlice({
  name: 'currentChannel',
  initialState: 0,
  reducers: {
    initCurrentChannel(_, action) {
      return action.payload;
    },
    changeCurrentChannel(_, action) {
      return action.payload;
    },
  },
});

export const { changeCurrentChannel, initCurrentChannel } = currentChannel.actions;

export default currentChannel.reducer;

import { createSlice } from '@reduxjs/toolkit';

const channels = createSlice({
  initialState: [],
  name: 'channels',
  reducers: {
    initChannels(state, action) {
      return action.payload;
    },
    addChannel(state, action) {
      return state.push(action.payload);
    },
    deletedChanel(state) {
      return state;
    },
  },
});

export const { addChannel, deletedChanel, initChannels } = channels.actions;

export default channels.reducer;

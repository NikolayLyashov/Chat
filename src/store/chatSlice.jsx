import { createSlice } from '@reduxjs/toolkit';

const chatData = createSlice({
  name: 'chatSlice',
  initialState: {
    messages: [],
  },
  reducers: {
    newMessage(state, action) {
      state.messages.push(action.payload);
    },
  },
});

export const { actions } = chatData;

export default chatData.reducer;

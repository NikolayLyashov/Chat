import { createSlice } from '@reduxjs/toolkit';

const modal = createSlice({
  name: 'modal',
  initialState: {
    isOpen: false,
    type: null,
    extra: null,
  },
  reducers: {
    isModal(state, { payload }) {
      return { ...state, ...payload };
    },
  },
});

export const { actions } = modal;

export default modal.reducer;

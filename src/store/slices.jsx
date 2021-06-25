import { combineReducers } from '@reduxjs/toolkit';
import channelsReducer, { actions as channelsActions } from './channelsSlice';
import chatReducer, { actions as chatActions } from './chatSlice';
import modalReducer, { actions as modalActions } from './modalSlice';

export const actions = {
  ...channelsActions,
  ...chatActions,
  ...modalActions,
};

export default combineReducers({
  channelsReducer,
  chatReducer,
  modalReducer,
});

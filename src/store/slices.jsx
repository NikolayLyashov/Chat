import { combineReducers } from '@reduxjs/toolkit';
import channelsReducer, { actions as channelsActions } from './channelsSlice';
import chatReducer, { actions as chatActions } from './chatSlice';

export const actions = {
  ...channelsActions,
  ...chatActions,
};

export default combineReducers({
  channelsReducer,
  chatReducer,
});

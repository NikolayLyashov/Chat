import { combineReducers } from '@reduxjs/toolkit';
import channelsReducer, { actions as channelsActions } from './channelsSlice';

export const actions = {
  ...channelsActions,
};

export default combineReducers({
  channelsReducer,
});

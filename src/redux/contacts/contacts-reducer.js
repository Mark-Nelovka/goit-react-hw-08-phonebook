import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';
import actions from './actions';

const items = createReducer([], {
  [actions.addContacts.fulfilled]: (state, { payload }) => [...state, payload],
  [actions.fetchContacts.fulfilled]: (_, { payload }) => payload,
  [actions.deleteContacts.fulfilled]: (state, { payload }) => {
    return state.filter(({ id }) => id !== payload);
  },
  [actions.userUpdate.fulfilled]: (state, { payload }) => [...state, payload],
});

const filter = createReducer('', {
  [actions.filterName]: (_, { payload }) => payload,
});

export default combineReducers({
  items,
  filter,
});

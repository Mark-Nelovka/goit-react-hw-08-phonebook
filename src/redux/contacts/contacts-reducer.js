import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';
import actions from './actions';

const items = createReducer([], {
    [actions.fetchContacts.fulfilled]: (_, { payload }) => payload,
    [actions.deleteContacts.fulfilled]: (state, { payload }) => {
        return state.filter(({ id }) => id !== payload)
    }
});

const filter = createReducer('', {
    [actions.filterName]: (_, { payload }) => payload
});





export default combineReducers({
    items,
    filter,
})
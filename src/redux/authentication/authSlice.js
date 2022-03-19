import { createSlice } from '@reduxjs/toolkit';
import { register, login, logOut, refresh } from './authOperations';

const initialState = {
  user: { name: null, email: null },
  token: null,
  isLoggedIn: false,
  isLoading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: {
    [register.fulfilled](state, action) {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    [login.fulfilled](state, action) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoggedIn = true;
    },
    [logOut.fulfilled](state, action) {
      state.user = initialState.user;
      state.token = null;
      state.isLoggedIn = false;
    },
    [refresh.fulfilled](state, action) {
      state.user = action.payload;
    },
  },
});

export default authSlice.reducer;

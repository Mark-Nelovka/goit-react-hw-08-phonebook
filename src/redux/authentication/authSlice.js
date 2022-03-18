import { createSlice } from '@reduxjs/toolkit';
import { register, login, logOut } from './authOperations';

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
            console.log(action)
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        [login.fulfilled](state, action) {
            console.log(state)
            console.log(action)
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isLoggedIn = true;
        },
        [logOut.fulfilled](state, action) {
            console.log(action)
            state.user = initialState.user;
            state.token = null;
            state.isLoggedIn = false;
        }
    }
})

export default authSlice.reducer;
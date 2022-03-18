import axios from 'axios';
import Notiflix from 'notiflix';
import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.baseURL = 'https://connections-api.herokuapp.com';

const token = {
    set(token) {
        axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    },
    unset() {
        axios.defaults.headers.common.Authorization = '';
    },
};

const register = createAsyncThunk('auth/register', async item => {
    console.log(item)
    try {
        const { data } = await axios.post('/users/signup', item);
        token.set(data.token);
        console.log(data)
        return data;
    } catch (error) {
        Notiflix.Notify.failure(error);
    }
});

const login = createAsyncThunk('auth/login', async item => {
    console.log(item)
    try {
        const { data } = await axios.post('/users/login', item);
        token.set(data.token);
        console.log(data)
        return data;
    } catch (error) {
        Notiflix.Notify.failure(error);
    }
})

const logOut = createAsyncThunk('auth/logOut', async token => {
    console.log(token)
    try {
        const { data } = await axios.post('/users/logout', token);
        console.log(data)
        // token.set(data.token);

        return data;
    } catch (error) {
        Notiflix.Notify.failure(error);
    }
})

export { register, login, logOut };
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
  try {
    const { data } = await axios.post('/users/signup', item);
    token.set(data.token);
    Notiflix.Notify.success('register');
    return data;
  } catch (error) {
    Notiflix.Notify.failure(error);
  }
});

const login = createAsyncThunk('auth/login', async item => {
  try {
    const { data } = await axios.post('/users/login', item);
    token.set(data.token);
    Notiflix.Notify.success('login');
    return data;
  } catch (error) {
    Notiflix.Notify.failure(error);
  }
});

const logOut = createAsyncThunk('auth/logOut', async userToken => {
  try {
    const { data } = await axios.post('/users/logout', userToken);
    Notiflix.Notify.success('logOut');
    console.log(data);
    token.unset();

    return data;
  } catch (error) {
    Notiflix.Notify.failure(`logout${error}`);
  }
});

const refresh = createAsyncThunk('auth/current', async (_, thunkApi) => {
  const state = thunkApi.getState();
  const tokenStorage = state.auth.token;

  if (tokenStorage === null) {
    return thunkApi.rejectWithValue();
  }

  token.set(tokenStorage);
  try {
    const { data } = await axios.get('/users/current');
    return data;
  } catch (error) {
    Notiflix.Notify.failure(error);
  }
});

export { register, login, logOut, refresh };

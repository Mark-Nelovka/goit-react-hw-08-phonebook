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

const register = createAsyncThunk('auth/register', async (item, thunkApi) => {
  try {
    const { data } = await axios.post('/users/signup', item);
    token.set(data.token);
    Notiflix.Notify.success(`Вы зарегестрировались как ${item.name}`);
    return data;
  } catch (error) {
    if (error.message === 'Request failed with status code 400') {
      Notiflix.Notify.failure(
        'Некорректный email или слишком короткий пароль. Пароль должен содержать минимум 7 символов'
      );
      return thunkApi.rejectWithValue();
    }
  }
});

const login = createAsyncThunk('auth/login', async (item, thunkApi) => {
  try {
    const { data } = await axios.post('/users/login', item);
    token.set(data.token);
    Notiflix.Notify.success(`Вы вошли как ${item.email}`);
    return data;
  } catch (error) {
    if (error.message === 'Request failed with status code 400') {
      Notiflix.Notify.failure('Неверное имя или пароль');
      return thunkApi.rejectWithValue();
    }
  }
});

const logOut = createAsyncThunk('auth/logOut', async userToken => {
  try {
    const { data } = await axios.post('/users/logout', userToken);
    Notiflix.Notify.success('Спасибо что воспользовались нашей книгой:)');
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

import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Notiflix from 'notiflix';

const token = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = '';
  },
};

const fetchContacts = createAsyncThunk(
  'contacts/current',
  async (_, thunkApi) => {
    const state = thunkApi.getState();
    const tokenStorage = state.auth.token;

    token.set(tokenStorage);
    try {
      const { data } = await axios.get('/contacts');

      return data;
    } catch (error) {
      Notiflix.Notify.failure(error);
    }
  }
);

const addContacts = createAsyncThunk(
  'contacts/add',
  async ({ name, number }, thunkApi) => {
    const state = thunkApi.getState();
    const userToken = state.auth.token;

    token.set(userToken);

    try {
      const { data } = await axios.post('/contacts', {
        name,
        number,
      });
      Notiflix.Notify.success('+++++');
      console.log(data);
      return data;
    } catch (error) {
      Notiflix.Notify.failure(`addError${error}`);
    }
  }
);

const deleteContacts = createAsyncThunk(
  'contacts/delete',
  async (id, thunkApi) => {
    const state = thunkApi.getState();
    const userToken = state.auth.token;

    token.set(userToken);

    try {
      const { data } = await axios.delete(`/contacts/${id}`);
      Notiflix.Notify.success('-------');
      console.log(data);
      return data;
    } catch (error) {
      Notiflix.Notify.failure(`addError${error}`);
    }
    await axios.delete(`/contacts/${id}`);
  }
);

const userUpdate = createAsyncThunk(
  'contacts/update',
  async (id, item, thunkApi) => {
    console.log(id);
    console.log(item);
  }
);

const filterName = createAction('contacts/filterName');

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  addContacts,
  deleteContacts,
  filterName,
  fetchContacts,
  userUpdate,
};

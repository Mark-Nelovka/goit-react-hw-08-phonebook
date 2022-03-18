import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { nanoid } from "nanoid";


const fetchContacts = createAsyncThunk('contacts/fetchContacts', async () => {
    const contacts = await axios('http://localhost:4040/contacts').then(res => res.data);
    return contacts;
});

const addContacts = createAsyncThunk('contacts/add', async ({ name, number }) => {
    await axios.post('http://localhost:4040/contacts', {
        id: nanoid(),
        name,
        number
    });
})

const deleteContacts = createAsyncThunk('contacts/delete', async (id) => {
    await axios.delete(`http://localhost:4040/contacts/${id}`);
})

const filterName = createAction('contacts/filterName');

// eslint-disable-next-line import/no-anonymous-default-export
export default { addContacts, deleteContacts, filterName, fetchContacts };
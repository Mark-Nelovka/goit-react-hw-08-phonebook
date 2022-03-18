import { useState, lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from 'react-redux'
import actions from "redux/contacts/actions";
import s from "./App.module.css";
import Form from "./Components/Form/Form";
import ContactList from "./Components/Contacts/ContactList";
import Filter from "./Components/Filter/Filtet";
import WindowModal from "./Components/Modal/Modal";
import Navigations from "Components/Navigations/Navigation";
import Register from './Components/registerUser/register';
import HomePage from "Components/HomePage/HomePage";
import Login from "Components/LoginUser/Login";

function App() {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [deleteName, setDeleteName] = useState("");

  const onDelete = (contactDeleteDId) => {
    dispatch(actions.deleteContacts(contactDeleteDId));
    dispatch(actions.fetchContacts())
    setIsOpen(false);
  };

  const dontDelete = () => {
    setIsOpen(false);
    setDeleteName("");
  };

  const removeContact = (contactId) => {
    setDeleteName(contactId);
    setIsOpen(true);
  };

  return (
    <>
      <Navigations />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>

    // <section className={s.section}>
    //   <h1> Phonebook</h1>
    //   <Form />
    //   <h2>Contacts</h2>
    //   <p>Поиск контакта по имени</p>
    //   <Filter />
    //   <ContactList onRemoveContact={removeContact} />
    //   {isOpen ? (
    //     <WindowModal
    //       modalRemove={deleteName}
    //       dontDelete={dontDelete}
    //       onDelete={onDelete}
    //     />
    //   ) : (
    //     ""
    //   )}
    // </section>
  );
}
export default App;
import { useState } from "react";
import { useDispatch } from 'react-redux'
import actions from "redux/contacts/actions";
import s from "./App.module.css";
import Form from "./Components/Form/Form";
import ContactList from "./Components/Contacts/ContactList";
import Filter from "./Components/Filter/Filtet";
import WindowModal from "./Components/Modal/Modal";

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
    <section className={s.section}>
      <h1> Phonebook</h1>
      <Form />
      <h2>Contacts</h2>
      <p>Поиск контакта по имени</p>
      <Filter />
      <ContactList onRemoveContact={removeContact} />
      {isOpen ? (
        <WindowModal
          modalRemove={deleteName}
          dontDelete={dontDelete}
          onDelete={onDelete}
        />
      ) : (
        ""
      )}
    </section>
  );
}
export default App;
import { useState, lazy, Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import actions from 'redux/contacts/actions';
import Form from '../Form/Form';
import ContactList from '../Contacts/ContactList';
import Filter from '../Filter/Filtet';
import WindowModal from '../Modal/Modal';
import ModalUpdate from 'Components/Modal/modalUpdate';
import s from './phonebook.module.css';

function Phonebook() {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [opnenUpdate, setOpnenUpdate] = useState(false);
  const [deleteName, setDeleteName] = useState('');
  const [updateContact, setUpdateContact] = useState({
    id: '',
    contact: {},
  });

  const onDelete = contactDeleteDId => {
    dispatch(actions.deleteContacts(contactDeleteDId));
    dispatch(actions.fetchContacts());
    setIsOpen(false);
  };

  const dontDelete = () => {
    setIsOpen(false);
    setDeleteName('');
  };

  const removeContact = contactId => {
    setDeleteName(contactId);
    setIsOpen(true);
  };

  const onUpdate = contactDeleteDId => {
    dispatch(actions.deleteContacts(contactDeleteDId));
    dispatch(actions.fetchContacts());
    setIsOpen(false);
  };

  const dontUpdate = () => {
    setIsOpen(false);
    setDeleteName('');
  };

  const onUpdateContact = user => {
    setOpnenUpdate(true);
    console.log(user);
    setUpdateContact(user);
  };

  return (
    <section className={s.section}>
      <h1> Phonebook</h1>
      <Form />
      <h2>Contacts</h2>
      <p>Поиск контакта по имени</p>
      <Filter />
      <ContactList
        onRemoveContact={removeContact}
        onUpdateContact={onUpdateContact}
      />
      {isOpen ? (
        <WindowModal
          modalRemove={deleteName}
          dontDelete={dontDelete}
          onDelete={onDelete}
        />
      ) : (
        ''
      )}
      {opnenUpdate && (
        <ModalUpdate
          updateContact={updateContact}
          onUpdate={onUpdate}
          dontUpdate={dontUpdate}
        />
      )}
    </section>
  );
}

export default Phonebook;

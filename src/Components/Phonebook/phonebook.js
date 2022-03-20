import { useState } from 'react';
import { useDispatch } from 'react-redux';
import actions from 'redux/contacts/actions';
import Form from '../Form/Form';
import ContactList from '../Contacts/ContactList';
import Filter from '../Filter/Filtet';
import WindowModal from '../Modal/Modal';
import ModalUpdate from 'Components/Modal/modalUpdate';
import s from './phonebook.module.css';
import Notiflix from 'notiflix';

function Phonebook() {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [opnenUpdate, setOpnenUpdate] = useState(false);
  const [deleteName, setDeleteName] = useState('');
  const [updateContact, setUpdateContact] = useState({
    id: '',
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
    const { name, number } = contactDeleteDId;
    if (!name || !number) {
      Notiflix.Notify.info(
        'Для изменения контакта необходимо заполнить все поля'
      );
      return;
    }
    dispatch(actions.userUpdate(contactDeleteDId));
    dispatch(actions.fetchContacts());
    setOpnenUpdate(false);
  };

  const dontUpdate = () => {
    setOpnenUpdate(false);
  };

  const onUpdateContact = user => {
    setOpnenUpdate(true);
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

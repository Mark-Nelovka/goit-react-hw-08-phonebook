import React from 'react';
import PropTypes from 'prop-types';
import s from './ContList.module.css';
import { useSelector } from 'react-redux';
// import Login from 'Components/LoginUser/Login';

export default function ContactList({ onRemoveContact, onUpdateContact }) {
  const contacts = useSelector(state => state.contacts.items);
  const filter = useSelector(state => state.contacts.filter);
  const filterName = contacts.filter(contact => {
    if (contact.name === undefined) {
      // eslint-disable-next-line array-callback-return
      return;
    }
    return contact.name.toLowerCase().includes(filter.toLowerCase());
  });
  return (
    <>
      <ol className={s.ol}>
        {filterName &&
          filterName.map(({ id, name, number }) => {
            return (
              <li className={s.li} key={id}>
                {name}: {number}
                <div className={s.containerButton}>
                  <button
                    className={s.btnDelete}
                    name="delete"
                    onClick={() => onRemoveContact(id)}
                    type="button"
                  >
                    Delete
                  </button>
                  <button
                    className={s.btnUpdate}
                    name="delete"
                    onClick={() => onUpdateContact({ id, name, number })}
                    type="button"
                  >
                    Update
                  </button>
                </div>
              </li>
            );
          })}
      </ol>
    </>
  );
}

ContactList.propTypes = {
  onRemoveContact: PropTypes.func,
};

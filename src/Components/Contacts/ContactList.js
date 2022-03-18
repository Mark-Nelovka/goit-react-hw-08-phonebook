import React from "react";
import PropTypes from "prop-types";
import s from "./ContList.module.css";
import { useSelector } from 'react-redux'

export default function ContactList({ onRemoveContact }) {
  const contacts = useSelector(state => state.contacts.items)
  const filter = useSelector(state => state.contacts.filter);
  const filterName = contacts.filter((contact) => {
    if (contact.name === undefined) {
      // eslint-disable-next-line array-callback-return
      return;
    }
    return contact.name.toLowerCase().includes(filter.toLowerCase())
  }

  );
  return (
    <ol className={s.ul}>
      {filterName && filterName.map(({ id, name, number }) => {
        return (
          <li className={s.li} key={id}>
            {name}: {number}
            <button
              className={s.btn}
              name="delete"
              onClick={() => onRemoveContact({ id, name })}
              type="button"
            >
              Delete
            </button>
          </li>
        );
      })}
    </ol>
  );
}

ContactList.propTypes = {
  onRemoveContact: PropTypes.func,
};

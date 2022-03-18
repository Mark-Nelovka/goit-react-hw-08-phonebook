import { useState, useEffect } from "react";
import { useDispatch } from 'react-redux'
import actions from "redux/contacts/actions";
import PropTypes from "prop-types";
import s from "./Form.module.css";
// import actions from "redux/contacts/actions";
// import axios from "axios";
// import { nanoid } from "nanoid";



export default function Form() {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.currentTarget;
    if (name === "name") {
      setName(value);
      return;
    }
    setNumber(value);
  };

  useEffect(() => {
    dispatch(actions.fetchContacts());
  }, [dispatch])

  const dataSubmitForm = (e) => {
    e.preventDefault();
    dispatch(actions.addContacts({ name: name, number: number }));
    dispatch(actions.fetchContacts());
    setName("");
    setNumber("");
  };

  return (
    <form className={s.form} onSubmit={dataSubmitForm}>
      <label>
        Name
        <input
          className={s.input}
          type="text"
          name="name"
          value={name}
          onChange={handleChange}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </label>
      <label>
        Number
        <input
          className={s.input}
          type="tel"
          name="number"
          onChange={handleChange}
          value={number}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </label>

      <button className={s.btn} type="submit">
        Добавить контакт
      </button>
    </form>
  );
}

Form.propTypes = {
  name: PropTypes.string,
  number: PropTypes.number,
};

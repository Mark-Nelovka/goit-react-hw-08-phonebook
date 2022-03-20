import s from './modalUpdate.module.css';
import { useState } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
export default function ModalUpdate({ updateContact, onUpdate, dontUpdate }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const { id } = updateContact;
  const handleSubmitUpdate = e => {
    console.log(e);
  };

  const changeInputValue = e => {
    const { name, value } = e.target;
    switch (name) {
      case 'name':
        return setName(value);
      case 'number':
        return setNumber(value);
      default:
        return;
    }
  };

  return (
    <div className={s.backdrop}>
      <div className={s.div}>
        <b
          className={s.contactName}
        >{`Update contact ${updateContact.name}`}</b>
        <Form className={s.form} onSubmit={handleSubmitUpdate}>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label> New name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              onChange={changeInputValue}
              name="name"
              value={name}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicNumber">
            <Form.Label>New phone</Form.Label>
            <Form.Control
              type="tel"
              placeholder="Enter new phone"
              onChange={changeInputValue}
              name="number"
              value={number}
            />
          </Form.Group>
        </Form>
        <div className={s.containerqwe}>
          <button
            className={s.btnYes}
            type="button"
            onClick={() => onUpdate({ id, name, number })}
          >
            Update
          </button>
          <button
            className={s.btnNo}
            type="button"
            onClick={() => dontUpdate()}
          >
            CLose
          </button>
        </div>
      </div>
    </div>
  );
}

ModalUpdate.propTypes = {
  modalRemove: PropTypes.object,
  onDelete: PropTypes.func,
  dontDelete: PropTypes.func,
};

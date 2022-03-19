import s from './modalUpdate.module.css';
import { useState } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
export default function ModalUpdate({ updateContact, onUpdate, dontUpdate }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const handleSubmitUpdate = e => {
    console.log(e);
  };

  const changeInputValue = e => {
    const { name, value } = e.target;
    switch (name) {
      case 'name':
        return setName(value);
      case 'email':
        return setEmail(value);
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
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              onChange={changeInputValue}
              name="name"
              value={name}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              onChange={changeInputValue}
              name="email"
              value={email}
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
        </Form>
        <div className={s.containerqwe}>
          <button
            className={s.btnYes}
            type="button"
            onClick={() => onUpdate(onUpdate.id)}
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

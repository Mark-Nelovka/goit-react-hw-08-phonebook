import { useState } from 'react';
import { useDispatch } from 'react-redux';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { login } from '../../redux/authentication/authOperations';
import s from './Login.module.css';
function Login() {
  const [email, setEmail] = useState('');
  console.log(email);
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const changeInputValue = e => {
    const { name, value } = e.target;
    switch (name) {
      case 'email':
        return setEmail(value);
      case 'password':
        return setPassword(value);
      default:
        return;
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(login({ email, password }));
    setEmail('');
    setPassword('');
  };

  return (
    <Form className={s.form} onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          onChange={changeInputValue}
          name="email"
          value={email ? email : ''}
        />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          name="password"
          onChange={changeInputValue}
          value={password ? password : ''}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default Login;

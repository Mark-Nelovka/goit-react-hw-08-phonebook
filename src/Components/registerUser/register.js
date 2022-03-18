import { useState } from "react";
import { useDispatch } from 'react-redux'
import { register } from '../../redux/authentication/authOperations';
function Refister() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();

    const changeInputValue = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case 'name':
                return setName(value);
            case 'email':
                return setEmail(value);
            case 'password':
                return setPassword(value);
            default: return;
        }

    }

    const handleSubmitRegistration = (e) => {
        e.preventDefault();
        dispatch(register({ name, email, password }))
    }

    return (
        <form onSubmit={handleSubmitRegistration}>
            <input type='text' name="name" value={name} onChange={changeInputValue} />
            <input type='email' name="email" value={email} onChange={changeInputValue} />
            <input type='password' name="password" value={password} onChange={changeInputValue} />
            <button type="submit">Register</button>
        </form>
    )
}

export default Refister;
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from '../../redux/authentication/authOperations';
function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();

    const changeInputValue = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case 'email':
                return setEmail(value);
            case 'password':
                return setPassword(value);
            default: return;
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(login({ email, password }))
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="email" name="email" value={email} onChange={changeInputValue} />
            <input type="password" name="password" value={password} onChange={changeInputValue} />
            <button type="submit">Login</button>
        </form>
    )
}

export default Login;
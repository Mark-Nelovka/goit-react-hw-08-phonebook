import s from './navigation.module.css';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logOut } from 'redux/authentication/authOperations';

function Navigation() {
    const dispatch = useDispatch();
    const token = useSelector(state => state.auth.token);
    console.log(token)
    const submitLogOut = (e) => {
        e.preventDefault();
        dispatch(logOut(token))
    }
    return (
        <header className={s.header}>
            <nav>
                <NavLink to="/" className={({ isActive }) => `${isActive ? s.active : s.link}`}>
                    Home
                </NavLink>
                <NavLink to="/login" className={({ isActive }) => `${isActive ? s.active : s.link}`}>
                    Login
                </NavLink>

                <NavLink to="/register" className={({ isActive }) => `${isActive ? s.active : s.link}`}>
                    Register
                </NavLink>
                <form onSubmit={submitLogOut}>
                    <button type="submit">LogOut</button>
                </form>

            </nav>
        </header>
    )
}

export default Navigation;
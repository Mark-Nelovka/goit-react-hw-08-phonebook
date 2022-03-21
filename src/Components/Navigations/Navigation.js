import s from './navigation.module.css';
import { NavLink } from 'react-router-dom';
import UseMenu from 'Components/UseMenu/UseMenu';
import { useSelector } from 'react-redux';

function Navigation() {
  const token = useSelector(state => state.auth.token);

  return (
    <header className={s.header}>
      <nav className={s.navMenu}>
        <NavLink
          to="/"
          className={({ isActive }) => `${isActive ? s.active : s.link}`}
        >
          Home
        </NavLink>
        {token ? (
          <NavLink
            to="/phonebook"
            className={({ isActive }) => `${isActive ? s.active : s.link}`}
          >
            Phonebook
          </NavLink>
        ) : (
          <>
            <NavLink
              to="/login"
              className={({ isActive }) => `${isActive ? s.active : s.link}`}
            >
              Login
            </NavLink>
            <NavLink
              to="/register"
              className={({ isActive }) => `${isActive ? s.active : s.link}`}
            >
              Register
            </NavLink>{' '}
          </>
        )}
      </nav>
      {token && <UseMenu />}
    </header>
  );
}

export default Navigation;

import { useEffect } from 'react'; // useState, lazy, Suspense,
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Navigations from 'Components/Navigations/Navigation';
import Register from './Components/registerUser/register';
import HomePage from 'Components/HomePage/HomePage';
import Login from 'Components/LoginUser/Login';
import Phonebook from 'Components/Phonebook/phonebook';
import NotFound from 'Components/NotFound/NotFound';
import { refresh } from 'redux/authentication/authOperations';

function App() {
  const token = useSelector(state => state.auth.token);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!token) {
      return;
    }
    dispatch(refresh(token));
  }, [dispatch, token]);

  return (
    <>
      <Navigations />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/register"
          element={token ? <Navigate to="/phonebook" /> : <Register />}
        />
        <Route
          path="/login"
          element={token ? <Navigate to="/phonebook" /> : <Login />}
        />
        <Route
          path="/phonebook"
          element={token ? <Phonebook /> : <Navigate to="/login" />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
export default App;

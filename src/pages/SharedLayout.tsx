import React, { useEffect, useContext } from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from '../components/navigation';
import Snackbar from '../components/shared/Snackbar';
import { useLocation, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/appContext';

const SharedLayout = () => {
  const {
    state: { user }
  } = useContext(AppContext);
  const location = useLocation();
  const navigate = useNavigate();
  const { userID } = user;

  useEffect(() => {
    if (location.pathname === '/signin') return;
    if (location.pathname === '/signup') return;

    if (!userID) {
      navigate('/signin');
    }
  }, [location]);

  return (
    <>
      <Navigation />
      <Outlet />
      <Snackbar />
    </>
  );
};

export default SharedLayout;

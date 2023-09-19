import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { IoMdAdd } from 'react-icons/io';

import User from './User';
import { AppContext } from '../../context/appContext';
import { useNavigate } from 'react-router-dom';

function Users() {
  const Navigate = useNavigate();
  const {
    state: { users },
    dispatch
  } = useContext(AppContext);

  useEffect(() => {
    const URL = `${process.env.REACT_APP_BASE_URL}users/`;

    const fetchData = async (URL: string): Promise<void> => {
      try {
        const response = await axios.get(URL);
        dispatch({ type: 'SET_USERS', payload: response.data.data });
      } catch (error: any) {
        dispatch({
          type: 'DISPLAY_SNACKBAR',
          payload: {
            isOpen: true,
            message:
              error?.response?.data?.message || 'Unable to retrieve users',
            severity: 'error'
          }
        });
        console.log(error);
      }
    };

    fetchData(URL);
  }, []);

  return (
    <section className="users">
      <div className="section-header">
        <h1 className="section-header__title">Users</h1>
      </div>
      <div className="users__search"></div>
      <section className="users__container">
        {users?.map((user) => {
          return <User key={user.username} {...user} />;
        })}
      </section>
    </section>
  );
}

export default Users;

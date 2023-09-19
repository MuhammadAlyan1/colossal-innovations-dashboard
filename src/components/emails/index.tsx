import React, { useEffect, useContext } from 'react';
import { AppContext } from '../../context/appContext';
import axios from 'axios';
import Email from './Email';
import { IoMdAdd } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

const Emails = () => {
  const Navigate = useNavigate();
  const {
    state: { user, emails },
    dispatch
  } = useContext(AppContext);

  useEffect(() => {
    const URL = `${process.env.REACT_APP_BASE_URL}emails/`;

    const fetchData = async (URL: string): Promise<void> => {
      try {
        const response = await axios.post(URL, {
          userID: user.userID
        });
        dispatch({ type: 'SET_EMAILS', payload: response.data.data });
      } catch (error: any) {
        dispatch({
          type: 'DISPLAY_SNACKBAR',
          payload: {
            isOpen: true,
            message:
              error?.response?.data?.message || 'Unable to retrieve emails',
            severity: 'error'
          }
        });
        console.log(error);
      }
    };

    fetchData(URL);
  }, []);

  return (
    <section className="emails">
      <div className="section-header">
        <h1 className="section-header__title">Emails</h1>
      </div>
      <section className="emails__container">
        {emails?.map((email) => {
          return <Email key={email._id} {...email} />;
        })}
      </section>
    </section>
  );
};

export default Emails;

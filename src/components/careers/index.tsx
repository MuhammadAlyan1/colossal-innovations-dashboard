import React, { useEffect, useContext } from 'react';
import { AppContext } from '../../context/appContext';
import axios from 'axios';
import Career from './Career';
import { IoMdAdd } from 'react-icons/io';
import CareerDetails from './CareerDetails';
import { useNavigate } from 'react-router-dom';

const Careers = () => {
  const Navigate = useNavigate();
  const {
    state: { careers },
    dispatch
  } = useContext(AppContext);

  useEffect(() => {
    const URL = `${process.env.REACT_APP_BASE_URL}careers/`;

    const fetchData = async (URL: string): Promise<void> => {
      try {
        const response = await axios.get(URL);
        dispatch({ type: 'SET_CAREERS', payload: response.data.data });
      } catch (error: any) {
        dispatch({
          type: 'DISPLAY_SNACKBAR',
          payload: {
            isOpen: true,
            message:
              error?.response?.data?.message || 'Unable to retrieve careers',
            severity: 'error'
          }
        });
        console.log(error);
      }
    };

    fetchData(URL);
  }, []);

  return (
    <section className="careers">
      <div className="section-header">
        <h1 className="section-header__title">Careers</h1>
        <button
          className="section-header__submit-button"
          onClick={() => {
            Navigate(`/careers/create/`);
            window.scrollTo(0, 0);
          }}
        >
          <IoMdAdd className="section-header__button-icon" />
          Create Career
        </button>
      </div>
      <section className="careers__container">
        {careers?.map((career) => {
          return <Career key={career._id} {...career} />;
        })}
      </section>
    </section>
  );
};

export default Careers;

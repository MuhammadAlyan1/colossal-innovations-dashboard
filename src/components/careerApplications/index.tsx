import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { IoMdAdd } from 'react-icons/io';

import CareerApplication from './CareerApplication';
import { AppContext } from '../../context/appContext';
import { useNavigate } from 'react-router-dom';

function CareerApplications() {
  const Navigate = useNavigate();
  const {
    state: { careerApplications },
    dispatch
  } = useContext(AppContext);

  useEffect(() => {
    const URL = `${process.env.REACT_APP_BASE_URL}career-applications/`;

    const fetchData = async (URL: string): Promise<void> => {
      try {
        const response = await axios.get(URL);
        dispatch({
          type: 'SET_CAREER_APPLICATIONS',
          payload: response.data.data
        });
      } catch (error: any) {
        dispatch({
          type: 'DISPLAY_SNACKBAR',
          payload: {
            isOpen: true,
            message:
              error?.response?.data?.message ||
              'Unable to retrieve career applications',
            severity: 'error'
          }
        });
        console.log(error);
      }
    };

    fetchData(URL);
  }, []);

  return (
    <section className="careerApplications">
      <div className="section-header">
        <h1 className="section-header__title">Career Applications</h1>
      </div>
      <div className="careerApplications__search"></div>
      <section className="careerApplications__container">
        {careerApplications?.map((careerApplication) => {
          return (
            <CareerApplication
              key={careerApplication._id}
              {...careerApplication}
            />
          );
        })}
      </section>
    </section>
  );
}

export default CareerApplications;

import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from '../context/appContext';

import CareerDetails from '../components/careers/CareerDetails';
import axios from 'axios';
import { CareerType } from '../types/CareerType';

const CareerDetailsPage = () => {
  const [career, setCareer] = useState<CareerType | null>(null);
  const { dispatch } = useContext(AppContext);
  const { careerID } = useParams();

  useEffect(() => {
    const URL = `${process.env.REACT_APP_BASE_URL}careers/${careerID}`;

    const fetchData = async (URL: string): Promise<void> => {
      try {
        const response = await axios.get(URL);
        setCareer(response.data.data);
      } catch (error: any) {
        dispatch({
          type: 'DISPLAY_SNACKBAR',
          payload: {
            isOpen: true,
            message:
              error?.response?.data?.message || 'Unable to retrieve career',
            severity: 'error'
          }
        });
        console.log(error);
      }
    };

    fetchData(URL);
  }, [careerID]);

  if (!career) {
    return null;
  }

  return <CareerDetails {...career} />;
};

export default CareerDetailsPage;

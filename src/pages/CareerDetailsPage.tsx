import React, { useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/appContext';

import CareerDetails from '../components/careers/CareerDetails';

const CareerDetailsPage = () => {
  const {
    state: { careers },
    dispatch,
  } = useContext(AppContext);
  const navigate = useNavigate();
  const { careerID } = useParams();

  useEffect(() => {
    if (!careerID) {
      navigate('/404');
    }
  }, [careerID]);

  const career = careers.find((career) => career._id === careerID);

  if (!career) {
    dispatch({
      type: 'DISPLAY_SNACKBAR',
      payload: {
        isOpen: true,
        message: 'Career does not exists!',
        severity: 'error',
      },
    });
    navigate('/404');
    return null;
  }

  return <CareerDetails {...career} />;
};

export default CareerDetailsPage;

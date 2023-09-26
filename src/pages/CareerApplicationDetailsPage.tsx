import React, { useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/appContext';
import CareerApplicationDetails from '../components/careerApplications/CareerApplicationDetails';

const CareerApplicationDetailsPage = () => {
  const {
    state: { careerApplications },
    dispatch
  } = useContext(AppContext);
  const navigate = useNavigate();
  const { careerApplicationID } = useParams();

  useEffect(() => {
    if (!careerApplicationID) {
      navigate('/404');
    }
  }, [careerApplicationID]);

  const careerApplication = careerApplications.find(
    (careerApplication) => careerApplication._id === careerApplicationID
  );

  if (!careerApplication) {
    dispatch({
      type: 'DISPLAY_SNACKBAR',
      payload: {
        isOpen: true,
        message: 'Career application does not exists!',
        severity: 'error'
      }
    });
    navigate('/404');
    return null;
  }

  return <CareerApplicationDetails {...careerApplication} />;
};

export default CareerApplicationDetailsPage;

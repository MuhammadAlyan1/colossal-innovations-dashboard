import React, { useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/appContext';
import UpdateCareer from '../components/careers/UpdateCareer';

const CareerUpdatePage = () => {
  const {
    state: { careers, user },
    dispatch,
  } = useContext(AppContext);
  const navigate = useNavigate();
  const { careerID } = useParams();

  const { userID } = user;

  useEffect(() => {
    if (!careerID) {
      navigate('/404');
    }
  }, [careerID]);

  const career = careers.find((career) => career._id == careerID);

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

  return <UpdateCareer career={career} userID={userID} />;
};

export default CareerUpdatePage;

import React, { useEffect, useContext } from 'react';
import { BiErrorCircle } from 'react-icons/bi';
import { FiInfo } from 'react-icons/fi';
import { AiOutlineWarning } from 'react-icons/ai';
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';
import { SnackbarType } from '../../types/SnackbarType';
import { AppContext } from '../../context/appContext';

const Snackbar = (): JSX.Element => {
  const SNACKBAR_DURATION = 4000;
  const {
    state: { snackbar },
    dispatch,
  } = useContext(AppContext);
  const { isOpen, message, severity } = snackbar;

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch({ type: 'HIDE_SNACKBAR', payload: null });
    }, SNACKBAR_DURATION);

    return () => {
      clearTimeout(timer);
    };
  }, [isOpen, message, severity]);

  return (
    <div
      className={`snackbar--${severity} ${isOpen ? 'snackbar--visible' : ''}`}
    >
      {severity === 'info' && <FiInfo className="snackbar__icon" />}
      {severity === 'error' && <BiErrorCircle className="snackbar__icon" />}
      {severity === 'warning' && (
        <AiOutlineWarning className="snackbar__icon" />
      )}
      {severity === 'success' && (
        <IoMdCheckmarkCircleOutline className="snackbar__icon" />
      )}

      <p className="snackbar__message">{message}</p>
    </div>
  );
};

export default Snackbar;

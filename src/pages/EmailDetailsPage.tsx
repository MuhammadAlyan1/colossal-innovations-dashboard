import React, { useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/appContext';
import EmailDetails from '../components/emails/EmailDetails';
import EmailReply from '../components/emails/EmailReply';

const EmailDetailsPage = () => {
  const {
    state: { emails },
    dispatch
  } = useContext(AppContext);
  const navigate = useNavigate();
  const { emailID } = useParams();

  useEffect(() => {
    if (!emailID) {
      navigate('/404');
    }
  }, [emailID]);

  const email = emails.find((email) => email._id === emailID);

  if (!email) {
    dispatch({
      type: 'DISPLAY_SNACKBAR',
      payload: {
        isOpen: true,
        message: 'Email does not exists!',
        severity: 'error'
      }
    });
    navigate('/404');
    return null;
  }

  return (
    <>
      <EmailDetails {...email} />
      <EmailReply {...email} />
    </>
  );
};

export default EmailDetailsPage;

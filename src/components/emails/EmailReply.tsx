import React, { useState, useContext } from 'react';
import { EmailType } from '../../types/EmailType';
import FormGroup from '../shared/FormGroup';
import { AppContext } from '../../context/appContext';
import axios from 'axios';

const EmailReply = ({
  _id,
  name,
  email,
  message,
  subject,
  isRead,
  hasReplied,
  createdAt,
  parentEmail
}: EmailType) => {
  const {
    state: { user },
    dispatch
  } = useContext(AppContext);
  const [newEmail, setNewEmail] = useState(email);
  const [newSubject, setNewSubject] = useState(subject);
  const [newMessage, setNewMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const URL = `${process.env.REACT_APP_BASE_URL}emails/send-email`;
    try {
      const response = await axios.post(URL, {
        name,
        email: newEmail,
        subject: newSubject,
        message: newMessage,
        parentEmail: _id,
        userID: user.userID
      });

      if (response.data.success) {
        dispatch({
          type: 'DISPLAY_SNACKBAR',
          payload: {
            isOpen: true,
            message: 'Reply sent!',
            severity: 'success'
          }
        });
      } else {
        throw new Error('Something went wrong with email reply!');
      }
    } catch (error: any) {
      console.log(error);
      dispatch({
        type: 'DISPLAY_SNACKBAR',
        payload: {
          isOpen: true,
          message:
            error?.response?.data?.message || 'Failed to send email reply!',
          severity: 'error'
        }
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormGroup
        label="Email"
        placeholder="Enter Email"
        state={newEmail}
        setState={setNewEmail}
      />
      <FormGroup
        label="Subject"
        placeholder="Enter subject"
        state={newSubject}
        setState={setNewSubject}
      />
      <FormGroup
        label="Message"
        placeholder="Enter nessage"
        state={newMessage}
        setState={setNewMessage}
        rows={10}
      />
      <button type="submit" className="button--contained">
        REPLY
      </button>
    </form>
  );
};

export default EmailReply;

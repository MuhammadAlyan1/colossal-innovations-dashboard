import React, { useContext, useState } from 'react';

import { AiOutlineEye, AiOutlineUser, AiOutlineMail } from 'react-icons/ai';
import { BsTelephone, BsActivity } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { CareerApplicationType } from '../../types/CareerApplicationType';

import { formatDate } from '../../utils/formatData';
import FormGroup from '../shared/FormGroup';
import axios from 'axios';
import { AppContext } from '../../context/appContext';

const CareerApplicationDetails = ({
  _id,
  career,
  additionalNotes,
  applicationStatus,
  createdAt,
  email,
  fullName,
  phone,
  resumeURL
}: CareerApplicationType) => {
  const Navigate = useNavigate();
  const [notes, setNotes] = useState(additionalNotes);
  const [newEmail, setNewEmail] = useState(email);
  const [newSubject, setNewSubject] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const {
    state: { user },
    dispatch
  } = useContext(AppContext);

  const handleAdditionalNotesUpdate = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    console.log('notes');
    e.preventDefault();
    const URL = `${process.env.REACT_APP_BASE_URL}career-applications/${_id}`;

    try {
      const response = await axios.put(URL, {
        additionalNotes: notes,
        userID: user.userID
      });

      if (response.data.success) {
        dispatch({
          type: 'UPDATE_CAREER_APPLICATION_NOTES',
          payload: response.data.data
        });

        dispatch({
          type: 'DISPLAY_SNACKBAR',
          payload: {
            isOpen: true,
            message: 'Additional notes saved!',
            severity: 'success'
          }
        });
      } else {
        throw new Error('Something went wrong with saving additional notes');
      }
    } catch (error: any) {
      console.log(error);
      dispatch({
        type: 'DISPLAY_SNACKBAR',
        payload: {
          isOpen: true,
          message:
            error?.response?.data?.message ||
            'Failed to save additional notes!',
          severity: 'error'
        }
      });
    }
  };

  const handleSendEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const URL = `${process.env.REACT_APP_BASE_URL}emails/send-email`;
    try {
      const response = await axios.post(URL, {
        name: fullName,
        email: email,
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
            message: 'Email sent!',
            severity: 'success'
          }
        });
      } else {
        throw new Error('Failed to send email!');
      }
    } catch (error: any) {
      console.log(error);
      dispatch({
        type: 'DISPLAY_SNACKBAR',
        payload: {
          isOpen: true,
          message: error?.response?.data?.message || 'Failed to send email!',
          severity: 'error'
        }
      });
    }
  };

  return (
    <section className="careerApplicationDetails">
      <div className="section-header">
        <h1 className="section-header__title">Career Application</h1>
        <button
          className="section-header__submit-button"
          onClick={() => {
            Navigate(`/careers/view/${career}`);
            window.scrollTo(0, 0);
          }}
        >
          <AiOutlineEye className="section-header__button-icon" />
          Job Posting
        </button>
      </div>
      <div className="careerApplicationDetails__application-info">
        <ul className="careerApplicationDetails__personal-info">
          <li className="careerApplicationDetails__personal-info-item">
            <AiOutlineUser className="careerApplicationDetails__personal-info-icon" />
            {fullName}
          </li>
          <li className="careerApplicationDetails__personal-info-item">
            <AiOutlineMail className="careerApplicationDetails__personal-info-icon" />
            {email}
          </li>
          <li className="careerApplicationDetails__personal-info-item">
            <BsTelephone className="careerApplicationDetails__personal-info-icon" />
            {phone}
          </li>
          <li className="careerApplicationDetails__personal-info-item">
            <BsActivity className="careerApplicationDetails__personal-info-icon" />
            {applicationStatus}
          </li>
        </ul>
        <p className="careerApplicationDetails__creation-date">
          {formatDate(createdAt)}
        </p>
      </div>
      <form
        className="careerApplicationDetails__notes-form"
        onSubmit={(e) => handleAdditionalNotesUpdate(e)}
      >
        <FormGroup
          label="Additional Notes"
          placeholder="Additional notes"
          variant="standard"
          type="text"
          rows={5}
          state={notes}
          setState={setNotes}
        />
        <button
          type="submit"
          className="careerApplicationDetails__submit-button"
        >
          Save
        </button>
      </form>

      <iframe src={resumeURL} title="PDF Viewer" width="100%" height="580px" />

      <form onSubmit={handleSendEmail}>
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
          Send
        </button>
      </form>
    </section>
  );
};

export default CareerApplicationDetails;

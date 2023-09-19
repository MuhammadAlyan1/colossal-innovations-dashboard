import React from 'react';
import { EmailType } from '../../types/EmailType';
import { formatDate } from '../../utils/formatData';

const EmailDetails = ({ email, message, subject, createdAt }: EmailType) => {
  return (
    <div className="email-details">
      <div className="email-details__header">
        <p className="email-details__address">{email}</p>
        <p className="email-details__creation-date">{formatDate(createdAt)}</p>
      </div>
      <h1 className="email-details__subject">{subject}</h1>
      <p className="email-details__message">{message}</p>
    </div>
  );
};

export default EmailDetails;

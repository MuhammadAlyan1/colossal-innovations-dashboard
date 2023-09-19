import React, { useState } from 'react';
import { AiOutlineDelete, AiOutlineEye } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

import ConfirmModal from '../shared/ConfirmModal';
import { EmailType } from '../../types/EmailType';

const Email = ({ _id, email, subject }: EmailType) => {
  const [isDeleteModalOpened, setIsDeleteModalOpened] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="email">
      <div className="email__contents">
        <p className="email__address">{email}</p>
        <p className="email__subject">{subject}</p>
      </div>
      <div className="email__buttons">
        <button
          className="email__button--view"
          onClick={() => {
            navigate(`/emails/view/${_id}`);
            window.scrollTo(0, 0);
          }}
        >
          <AiOutlineEye className="email__button-icon" />
        </button>
        <button
          className="email__button--delete"
          onClick={() => setIsDeleteModalOpened(true)}
        >
          <AiOutlineDelete className="email__button-icon" />
        </button>
      </div>
      {isDeleteModalOpened && (
        <ConfirmModal
          name="email"
          itemTitle={subject}
          setIsModalOpened={setIsDeleteModalOpened}
          apiEndpoint={`emails/${_id}`}
          actionType="DELETE_EMAIL"
          actionPayload={_id}
          httpVerb="delete"
        />
      )}
    </div>
  );
};

export default Email;

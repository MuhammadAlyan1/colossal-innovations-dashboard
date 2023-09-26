import React, { useState } from 'react';

import { CareerApplicationType } from '../../types/CareerApplicationType';
import { ApplicationStatusType } from '../../types/ApplicationStatusType';

import { useNavigate } from 'react-router-dom';
import { AiOutlineDelete, AiOutlineEye } from 'react-icons/ai';
import ConfirmModal from '../shared/ConfirmModal';
import { FaAngleDown } from 'react-icons/fa';

const CareerApplication = ({
  _id,
  fullName,
  email,
  applicationStatus
}: CareerApplicationType) => {
  const [isDeleteModalOpened, setIsDeleteModalOpened] = useState(false);
  const [isUpdateRoleModalOpened, setIsUpdateRoleModalOpened] = useState(false);
  const [selectedApplicationStatus, setSelectedApplicationStatus] =
    useState<ApplicationStatusType>(applicationStatus);

  const navigate = useNavigate();

  const handleCareerApplicationDelete = () => {
    setIsDeleteModalOpened(true);
  };

  const handleRoleSelect = (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>,
    newRole: ApplicationStatusType
  ) => {
    e.currentTarget.blur();
    setSelectedApplicationStatus(newRole);
    setIsUpdateRoleModalOpened(true);
  };

  return (
    <div className="careerApplication">
      <div className="careerApplication__applicant">
        <p className="careerApplication__name">{fullName}</p>
        <p className="careerApplication__email">{email}</p>
      </div>
      <div className="careerApplication__actions">
        <div className="careerApplication__role-select">
          <button className="careerApplication__role-select-button">
            {applicationStatus}
            <FaAngleDown className="careerApplication__dropdown-icon" />
          </button>
          {
            <ul className="careerApplication__dropdown-menu">
              <li
                tabIndex={0}
                className="careerApplication__dropdown-menu-item"
                onClick={(e) => handleRoleSelect(e, 'SUBMITTED')}
              >
                SUBMITTED
              </li>
              <li
                tabIndex={0}
                className="careerApplication__dropdown-menu-item"
                onClick={(e) => handleRoleSelect(e, 'SHORTLISTED')}
              >
                SHORTLISTED
              </li>
              <li
                tabIndex={0}
                className="careerApplication__dropdown-menu-item"
                onClick={(e) => handleRoleSelect(e, 'INTERVIEW SCHEDULED')}
              >
                INTERVIEW SCHEDULED
              </li>
              <li
                tabIndex={0}
                className="careerApplication__dropdown-menu-item"
                onClick={(e) => handleRoleSelect(e, 'OFFER EXTENDED')}
              >
                OFFER EXTENDED
              </li>
              <li
                tabIndex={0}
                className="careerApplication__dropdown-menu-item"
                onClick={(e) => handleRoleSelect(e, 'HIRED')}
              >
                HIRED
              </li>
              <li
                tabIndex={0}
                className="careerApplication__dropdown-menu-item"
                onClick={(e) => handleRoleSelect(e, 'REJECTED')}
              >
                REJECTED
              </li>
            </ul>
          }
        </div>
        <button
          className="careerApplication__button--view"
          onClick={() => {
            navigate(`/career-applications/view/${_id}`);
            window.scrollTo(0, 0);
          }}
        >
          <AiOutlineEye className="careerApplication__button-icon" />
        </button>
        <button
          className="careerApplication__button--delete"
          onClick={handleCareerApplicationDelete}
        >
          <AiOutlineDelete className="careerApplication__button-icon" />
        </button>
      </div>
      {isDeleteModalOpened && (
        <ConfirmModal
          name="career application"
          itemTitle={fullName}
          setIsModalOpened={setIsDeleteModalOpened}
          apiEndpoint={`career-applications/${_id}`}
          actionType="DELETE_CAREER_APPLICATION"
          actionPayload={_id}
          httpVerb="delete"
        />
      )}
      {isUpdateRoleModalOpened && (
        <ConfirmModal
          name="user"
          itemTitle={fullName}
          setIsModalOpened={setIsUpdateRoleModalOpened}
          apiEndpoint={`career-applications/${_id}`}
          actionType="UPDATE_CAREER_APPLICATION_STATUS"
          actionPayload={{ _id, applicationStatus: selectedApplicationStatus }}
          httpVerb="put"
          requestData={{
            applicationStatus: selectedApplicationStatus
          }}
        />
      )}
    </div>
  );
};

export default CareerApplication;

import React, { useState } from 'react';
import { CareerType } from '../../types/CareerType';
import { truncateText } from '../../utils/truncateText';
import { useNavigate } from 'react-router-dom';

import { AiOutlineEdit, AiOutlineDelete, AiOutlineEye } from 'react-icons/ai';
import ConfirmModal from '../shared/ConfirmModal';

const Career = ({ _id, title, tags, description }: CareerType) => {
  const [isModalOpened, setIsModalOpened] = useState(false);
  const navigate = useNavigate();

  const handleCareerDelete = () => {
    setIsModalOpened(true);
  };

  return (
    <article className="career">
      <h3 className="career__title">{title}</h3>
      <p className="career__description">{truncateText(description)}</p>
      <ul className="career__tags-container">
        {tags.map((tag, index) => (
          <li key={tag + index} className="career__tag">
            {tag}
          </li>
        ))}
      </ul>
      <div className="career__buttons-container">
        <button
          className="career__button--view"
          onClick={() => {
            navigate(`/careers/view/${_id}`);
            window.scrollTo(0, 0);
          }}
        >
          <AiOutlineEye className="career__button-icon" />
        </button>
        <button
          className="career__button--edit"
          onClick={() => {
            navigate(`/careers/update/${_id}`);
            window.scrollTo(0, 0);
          }}
        >
          <AiOutlineEdit className="career__button-icon" />
        </button>
        <button className="career__button--delete" onClick={handleCareerDelete}>
          <AiOutlineDelete className="career__button-icon" />
        </button>
      </div>
      {isModalOpened && (
        <ConfirmModal
          name="career"
          itemTitle={title}
          setIsModalOpened={setIsModalOpened}
          apiEndpoint={`careers/${_id}`}
          actionType="DELETE_CAREER"
          actionPayload={_id}
          httpVerb="delete"
        />
      )}
    </article>
  );
};

export default Career;

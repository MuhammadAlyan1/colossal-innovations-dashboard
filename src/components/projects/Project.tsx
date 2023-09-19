import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ProjectType } from '../../types/ProjectType';

import { AiOutlineEdit, AiOutlineDelete, AiOutlineEye } from 'react-icons/ai';
import ConfirmModal from '../shared/ConfirmModal';

const Project = ({ _id, title, image, tags }: ProjectType) => {
  const [isModalOpened, setIsModalOpened] = useState(false);
  const navigate = useNavigate();

  const handleProjectDelete = () => {
    setIsModalOpened(true);
  };

  return (
    <article className="project">
      <div className="project__image-container">
        <img className="project__image" src={image} alt={title} />
      </div>
      <div className="project__contents">
        <h3 className="project__title">{title}</h3>
        <ul className="project__tags">
          {tags.map((tag) => (
            <li className="project__tag">{tag}</li>
          ))}
        </ul>
        <div className="project__buttons-container">
          <button
            className="project__button--view"
            onClick={() => {
              navigate(`/projects/view/${_id}`);
              window.scrollTo(0, 0);
            }}
          >
            <AiOutlineEye className="project__button-icon" />
          </button>
          <button
            className="project__button--edit"
            onClick={() => {
              navigate(`/projects/update/${_id}`);
              window.scrollTo(0, 0);
            }}
          >
            <AiOutlineEdit className="project__button-icon" />
          </button>
          <button
            className="project__button--delete"
            onClick={handleProjectDelete}
          >
            <AiOutlineDelete className="project__button-icon" />
          </button>
        </div>
      </div>
      {isModalOpened && (
        <ConfirmModal
          name="project post"
          itemTitle={title}
          setIsModalOpened={setIsModalOpened}
          apiEndpoint={`projects/${_id}`}
          actionType="DELETE_PROJECT"
          actionPayload={_id}
          httpVerb="delete"
        />
      )}
    </article>
  );
};

export default Project;

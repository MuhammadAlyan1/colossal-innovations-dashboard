import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { BlogType } from '../../types/BlogType';

import { AiOutlineEdit, AiOutlineDelete, AiOutlineEye } from 'react-icons/ai';
import { truncateText } from '../../utils/truncateText';
import ConfirmModal from '../shared/ConfirmModal';

const Blog = ({ _id, title, image, description }: BlogType) => {
  const [isModalOpened, setIsModalOpened] = useState(false);
  const navigate = useNavigate();

  const handleBlogDelete = () => {
    setIsModalOpened(true);
  };

  return (
    <article className="blog">
      <div className="blog__image-container">
        <img className="blog__image" src={image} alt={title} />
      </div>
      <div className="blog__contents">
        <h3 className="blog__title ">{title}</h3>
        <p className="blog__description">{truncateText(description)}</p>
        <div className="blog__buttons-container">
          <button
            className="blog__button--view"
            onClick={() => {
              navigate(`/blogs/view/${_id}`);
              window.scrollTo(0, 0);
            }}
          >
            <AiOutlineEye className="blog__button-icon" />
          </button>
          <button
            className="blog__button--edit"
            onClick={() => {
              navigate(`/blogs/update/${_id}`);
              window.scrollTo(0, 0);
            }}
          >
            <AiOutlineEdit className="blog__button-icon" />
          </button>
          <button className="blog__button--delete" onClick={handleBlogDelete}>
            <AiOutlineDelete className="blog__button-icon" />
          </button>
        </div>
      </div>
      {isModalOpened && (
        <ConfirmModal
          name="blog post"
          itemTitle={title}
          setIsModalOpened={setIsModalOpened}
          apiEndpoint={`blogs/${_id}`}
          actionType="DELETE_BLOG"
          actionPayload={_id}
          httpVerb="delete"
        />
      )}
    </article>
  );
};

export default Blog;

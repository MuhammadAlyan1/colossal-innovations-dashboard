import React, { useEffect, useState, useContext } from 'react';
import FormGroup from '../shared/FormGroup';
import axios from 'axios';
import { AppContext } from '../../context/appContext';

import { AiOutlineEdit } from 'react-icons/ai';
import { BlogType } from '../../types/BlogType';

const UpdateBlog = ({ userID, blog }: { userID: string; blog: BlogType }) => {
  const { dispatch } = useContext(AppContext);

  const [image, setImage] = useState(blog.image);
  const [title, setTitle] = useState(blog.title);
  const [description, setDescription] = useState(blog.description);
  const [tags, setTags] = useState(blog.tags.join(', '));
  const [contents, setContents] = useState(blog.contents);

  const handleUpdateBlog = async () => {
    const URL = `${process.env.REACT_APP_BASE_URL}blogs/${blog._id}`;

    try {
      const response = await axios.put(URL, {
        image,
        title,
        description,
        contents,
        tags: tags.split(','),
        userID: userID
      });

      if (response.data.success) {
        dispatch({
          type: 'UPDATE_BLOG',
          payload: response.data.data
        });

        dispatch({
          type: 'DISPLAY_SNACKBAR',
          payload: {
            isOpen: true,
            message: 'Blog updated!',
            severity: 'success'
          }
        });
      } else {
        throw new Error('Something went wrong with updating the blog');
      }
    } catch (error: any) {
      console.log(error);
      dispatch({
        type: 'DISPLAY_SNACKBAR',
        payload: {
          isOpen: true,
          message: error?.response?.data?.message || 'Failed to update blog!',
          severity: 'error'
        }
      });
    }
  };

  return (
    <section className="update-blog">
      <div className="section-header">
        <h1 className="section-header__title">Blogs</h1>
        <button
          className="section-header__submit-button"
          onClick={handleUpdateBlog}
        >
          <AiOutlineEdit className="section-header__button-icon" />
          Update blog
        </button>
      </div>
      <form>
        <FormGroup
          label="Title"
          placeholder="Enter blog title"
          state={title}
          setState={setTitle}
        />
        <FormGroup
          label="Image"
          placeholder="Image Link"
          state={image}
          setState={setImage}
        />
        <FormGroup
          label="Description"
          placeholder="Short Description"
          state={description}
          setState={setDescription}
          rows={5}
        />
        <FormGroup
          label="Tags"
          placeholder="Tags (Comma seperated)"
          state={tags}
          setState={setTags}
        />
        <FormGroup
          label="Blog Contents"
          placeholder="Blog Contents"
          state={contents}
          setState={setContents}
          rows={20}
        />
      </form>
    </section>
  );
};

export default UpdateBlog;

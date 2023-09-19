import axios from 'axios';
import React, { useContext, useState } from 'react';
import FormGroup from '../shared/FormGroup';
import { AppContext } from '../../context/appContext';

import { IoMdAdd } from 'react-icons/io';

const CreateBlog = () => {
  const [image, setImage] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [contents, setContents] = useState('');
  const [tags, setTags] = useState('');

  const {
    state: { user },
    dispatch
  } = useContext(AppContext);
  const { userID } = user;

  const handleCreateBlog = async () => {
    const URL = `${process.env.REACT_APP_BASE_URL}blogs`;

    if (!image || !title || !description || !contents || !tags) {
      dispatch({
        type: 'DISPLAY_SNACKBAR',
        payload: {
          isOpen: true,
          message: 'Please enter all fields!',
          severity: 'warning'
        }
      });
      return;
    }

    try {
      const response = await axios.post(URL, {
        image,
        title,
        description,
        contents,
        tags: tags.split(', '),
        userID
      });

      if (response.data.success) {
        setImage('');
        setTitle('');
        setDescription('');
        setContents('');
        setTags('');

        dispatch({
          type: 'CREATE_BLOG',
          payload: response.data.data
        });

        dispatch({
          type: 'DISPLAY_SNACKBAR',
          payload: {
            isOpen: true,
            message: 'Blog published',
            severity: 'success'
          }
        });
      } else {
        throw new Error('Something went wrong with blog creation');
      }
    } catch (error: any) {
      console.log(error);
      dispatch({
        type: 'DISPLAY_SNACKBAR',
        payload: {
          isOpen: true,
          message: error?.response?.data?.message || 'Failed to publish blog!',
          severity: 'error'
        }
      });
    }
  };

  return (
    <section className="create-blog">
      <div className="section-header">
        <h1 className="section-header__title">Blogs</h1>
        <button
          className="section-header__submit-button"
          onClick={handleCreateBlog}
        >
          <IoMdAdd className="section-header__button-icon" />
          Publish blog
        </button>
      </div>
      <form className="create-blog-form">
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

export default CreateBlog;

import React, { useContext, useState } from 'react';
import axios from 'axios';
import FormGroup from '../shared/FormGroup';
import { AppContext } from '../../context/appContext';

import { IoMdAdd } from 'react-icons/io';

const CreateCareer = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [contents, setContents] = useState('');
  const [tags, setTags] = useState('');

  const {
    state: { user },
    dispatch
  } = useContext(AppContext);

  const { userID } = user;

  const handleCreateCareer = async () => {
    const URL = `${process.env.REACT_APP_BASE_URL}careers`;

    if (!title || !description || !contents || !tags) {
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
        title,
        description,
        contents,
        tags: tags.split(', '),
        userID
      });

      if (response.data.success) {
        setTitle('');
        setDescription('');
        setContents('');
        setTags('');

        dispatch({
          type: 'CREATE_CAREER',
          payload: response.data.data
        });

        dispatch({
          type: 'DISPLAY_SNACKBAR',
          payload: {
            isOpen: true,
            message: 'Career published',
            severity: 'success'
          }
        });
      } else {
        throw new Error('Something went wrong with career creation');
      }
    } catch (error: any) {
      dispatch({
        type: 'DISPLAY_SNACKBAR',
        payload: {
          isOpen: true,
          message:
            error?.response?.data?.message || 'Failed to publish career!',
          severity: 'error'
        }
      });
    }
  };

  return (
    <section className="create-career">
      <div className="section-header">
        <h1 className="section-header__title">Careers</h1>
        <button
          className="section-header__submit-button"
          onClick={handleCreateCareer}
        >
          <IoMdAdd className="section-header__button-icon" />
          Publish career
        </button>
      </div>
      <form className="create-career__form">
        <FormGroup
          label="Title"
          placeholder="Enter career title"
          state={title}
          setState={setTitle}
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
          label="Career Contents"
          placeholder="Career Contents"
          state={contents}
          setState={setContents}
          rows={20}
        />
      </form>
    </section>
  );
};

export default CreateCareer;

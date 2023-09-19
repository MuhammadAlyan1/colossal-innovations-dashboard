import axios from 'axios';
import React, { useContext, useState } from 'react';
import FormGroup from '../shared/FormGroup';
import { AppContext } from '../../context/appContext';

import { IoMdAdd } from 'react-icons/io';

const CreateProject = () => {
  const [image, setImage] = useState('');
  const [title, setTitle] = useState('');
  const [contents, setContents] = useState('');
  const [tags, setTags] = useState('');

  const {
    state: { user },
    dispatch
  } = useContext(AppContext);
  const { userID } = user;

  const handleCreateProject = async () => {
    const URL = `${process.env.REACT_APP_BASE_URL}projects`;

    if (!image || !title || !contents || !tags) {
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
        contents,
        tags: tags.split(', '),
        userID
      });

      if (response.data.success) {
        setImage('');
        setTitle('');
        setContents('');
        setTags('');

        dispatch({
          type: 'CREATE_PROJECT',
          payload: response.data.data
        });

        dispatch({
          type: 'DISPLAY_SNACKBAR',
          payload: {
            isOpen: true,
            message: 'Project published',
            severity: 'success'
          }
        });
      } else {
        throw new Error('Something went wrong with project creation');
      }
    } catch (error: any) {
      console.log(error);
      dispatch({
        type: 'DISPLAY_SNACKBAR',
        payload: {
          isOpen: true,
          message: error.response.data.message,
          severity: 'error'
        }
      });
    }
  };

  return (
    <section className="create-project">
      <div className="section-header">
        <h1 className="section-header__title">Projects</h1>
        <button
          className="section-header__submit-button"
          onClick={handleCreateProject}
        >
          <IoMdAdd className="section-header__button-icon" />
          Publish project
        </button>
      </div>
      <form className="create-project-form">
        <FormGroup
          label="Title"
          placeholder="Enter project title"
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
          label="Tags"
          placeholder="Tags (Comma seperated)"
          state={tags}
          setState={setTags}
        />
        <FormGroup
          label="Project Contents"
          placeholder="Project Contents"
          state={contents}
          setState={setContents}
          rows={20}
        />
      </form>
    </section>
  );
};

export default CreateProject;

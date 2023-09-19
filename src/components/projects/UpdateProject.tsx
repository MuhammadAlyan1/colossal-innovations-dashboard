import React, { useEffect, useState, useContext } from 'react';
import FormGroup from '../shared/FormGroup';
import axios from 'axios';
import { AppContext } from '../../context/appContext';

import { AiOutlineEdit } from 'react-icons/ai';
import { ProjectType } from '../../types/ProjectType';

const UpdateProject = ({
  userID,
  project
}: {
  userID: string;
  project: ProjectType;
}) => {
  const { dispatch } = useContext(AppContext);

  const [image, setImage] = useState(project.image);
  const [title, setTitle] = useState(project.title);
  const [tags, setTags] = useState(project.tags.join(', '));
  const [contents, setContents] = useState(project.contents);

  const handleUpdateProject = async () => {
    const URL = `${process.env.REACT_APP_BASE_URL}projects/${project._id}`;

    try {
      const response = await axios.put(URL, {
        image,
        title,
        contents,
        tags: tags.split(','),
        userID: userID
      });

      if (response.data.success) {
        dispatch({
          type: 'UPDATE_PROJECT',
          payload: response.data.data
        });

        dispatch({
          type: 'DISPLAY_SNACKBAR',
          payload: {
            isOpen: true,
            message: 'Project updated!',
            severity: 'success'
          }
        });
      } else {
        throw new Error('Something went wrong with updating the project');
      }
    } catch (error: any) {
      console.log(error);
      dispatch({
        type: 'DISPLAY_SNACKBAR',
        payload: {
          isOpen: true,
          message:
            error?.response?.data?.message || 'Failed to update project!',
          severity: 'error'
        }
      });
    }
  };

  return (
    <section className="update-project">
      <div className="section-header">
        <h1 className="section-header__title">Projects</h1>
        <button
          className="section-header__submit-button"
          onClick={handleUpdateProject}
        >
          <AiOutlineEdit className="section-header__button-icon" />
          Update project
        </button>
      </div>
      <form>
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

export default UpdateProject;

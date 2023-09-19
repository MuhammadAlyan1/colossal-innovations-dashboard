import React, { useEffect, useState, useContext } from 'react';
import FormGroup from '../shared/FormGroup';
import axios from 'axios';
import { AppContext } from '../../context/appContext';

import { AiOutlineEdit } from 'react-icons/ai';
import { CareerType } from '../../types/CareerType';

const UpdateCareer = ({
  userID,
  career
}: {
  userID: string;
  career: CareerType;
}) => {
  const { dispatch } = useContext(AppContext);

  const [title, setTitle] = useState(career.title);
  const [description, setDescription] = useState(career.description);
  const [tags, setTags] = useState(career.tags.join(', '));
  const [contents, setContents] = useState(career.contents);

  const handleUpdateCareer = async () => {
    const URL = `${process.env.REACT_APP_BASE_URL}careers/${career._id}`;

    try {
      const response = await axios.put(URL, {
        title,
        description,
        contents,
        tags: tags.split(','),
        userID: userID
      });

      if (response.data.success) {
        dispatch({
          type: 'UPDATE_CAREER',
          payload: response.data.data
        });

        dispatch({
          type: 'DISPLAY_SNACKBAR',
          payload: {
            isOpen: true,
            message: 'Career updated!',
            severity: 'success'
          }
        });
      } else {
        throw new Error('Something went wrong with updating the career');
      }
    } catch (error: any) {
      console.log(error);
      dispatch({
        type: 'DISPLAY_SNACKBAR',
        payload: {
          isOpen: true,
          message: error?.response?.data?.message || 'Failed to update career!',
          severity: 'error'
        }
      });
    }
  };

  return (
    <section className="update-career">
      <div className="section-header">
        <h1 className="section-header__title">Careers</h1>
        <button
          className="section-header__submit-button"
          onClick={handleUpdateCareer}
        >
          <AiOutlineEdit className="section-header__button-icon" />
          Update career
        </button>
      </div>
      <form>
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

export default UpdateCareer;

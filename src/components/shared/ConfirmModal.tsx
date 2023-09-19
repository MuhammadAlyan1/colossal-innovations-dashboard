import React, { useContext } from 'react';
import { AiOutlineWarning } from 'react-icons/ai';

import { DeleteModalType } from '../../types/DeleteModalType';
import axios from 'axios';
import { AppContext } from '../../context/appContext';

const ConfirmModal = ({
  name,
  itemTitle,
  setIsModalOpened,
  apiEndpoint,
  actionType,
  actionPayload,
  httpVerb,
  requestData
}: DeleteModalType) => {
  const {
    state: { user },
    dispatch
  } = useContext(AppContext);

  let actionToPerform = '';

  if (httpVerb === 'delete') {
    actionToPerform = 'delete';
  } else if (httpVerb === 'get') {
    actionToPerform = 'retrieve';
  } else if (httpVerb === 'post') {
    actionToPerform = 'create';
  } else {
    actionToPerform = 'update';
  }

  const handleDelete = async () => {
    try {
      const URL = `${process.env.REACT_APP_BASE_URL}${apiEndpoint}`;

      const axiosConfig = {
        method: httpVerb,
        url: URL,
        data: {
          ...requestData,
          userID: user.userID
        }
      };

      const response = await axios(axiosConfig);

      if (response.data.success) {
        dispatch({ type: actionType, payload: actionPayload });
        dispatch({
          type: 'DISPLAY_SNACKBAR',
          payload: {
            isOpen: true,
            message: 'Action performed successfully',
            severity: 'success'
          }
        });
      } else {
        throw new Error(`Something went wrong with ${name} deletion`);
      }
    } catch (error: any) {
      console.log(error);
      dispatch({
        type: 'DISPLAY_SNACKBAR',
        payload: {
          isOpen: true,
          message:
            error?.response?.data?.message ||
            `Failed to ${actionToPerform} ${name}!`,
          severity: 'error'
        }
      });
    } finally {
      setIsModalOpened(false);
    }
  };

  const handleCancel = () => {
    setIsModalOpened(false);
  };

  return (
    <div className="delete-modal">
      <div className="delete-modal__contents">
        <div className="delete-modal__icon-container">
          <AiOutlineWarning className="delete-modal__icon" />
        </div>
        <p className="delete-modal__warning">
          {`You are about to ${actionToPerform} the following ${name}`}
        </p>

        <p className="delete-modal__item-title">{itemTitle}</p>
        <button className="delete-modal__button--delete" onClick={handleDelete}>
          {actionToPerform}
        </button>
        <button className="delete-modal__button--cancel" onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ConfirmModal;

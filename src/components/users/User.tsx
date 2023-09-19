import React, { useState } from 'react';
import { UserType } from '../../types/UserType';
import { AiOutlineDelete } from 'react-icons/ai';
import ConfirmModal from '../shared/ConfirmModal';
import { FaAngleDown } from 'react-icons/fa';

type roleType = 'user' | 'admin' | 'moderator';

const User = ({ userID, username, role }: UserType) => {
  const [isDeleteModalOpened, setIsDeleteModalOpened] = useState(false);
  const [isUpdateRoleModalOpened, setIsUpdateRoleModalOpened] = useState(false);
  const [selectedRole, setSelectedRole] = useState<roleType>(role);
  const handleUserDelete = () => {
    setIsDeleteModalOpened(true);
  };

  const handleRoleSelect = (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>,
    newRole: roleType
  ) => {
    e.currentTarget.blur();
    setSelectedRole(newRole);
    setIsUpdateRoleModalOpened(true);
  };

  return (
    <div className="user">
      <p className="user__username">
        {username}
        <span className={`user__user-role user__user-role--${role}`}>
          {role}
        </span>
      </p>
      <div className="user__actions">
        <div className="user__role-select">
          <button className="user__role-select-button">
            {role}
            <FaAngleDown className="user__dropdown-icon" />
          </button>
          {
            <ul className="user__dropdown-menu">
              <li
                tabIndex={0}
                className="user__dropdown-menu-item"
                onClick={(e) => handleRoleSelect(e, 'user')}
              >
                User
              </li>
              <li
                tabIndex={0}
                className="user__dropdown-menu-item"
                onClick={(e) => handleRoleSelect(e, 'moderator')}
              >
                Moderator
              </li>
              <li
                tabIndex={0}
                className="user__dropdown-menu-item"
                onClick={(e) => handleRoleSelect(e, 'admin')}
              >
                Admin
              </li>
            </ul>
          }
        </div>
        <button className="user__button--delete" onClick={handleUserDelete}>
          <AiOutlineDelete className="user__button-icon" />
        </button>
      </div>
      {isDeleteModalOpened && (
        <ConfirmModal
          name="user"
          itemTitle={username}
          setIsModalOpened={setIsDeleteModalOpened}
          apiEndpoint={`users/${userID}`}
          actionType="DELETE_USER"
          actionPayload={userID}
          httpVerb="delete"
        />
      )}

      {isUpdateRoleModalOpened && (
        <ConfirmModal
          name="user"
          itemTitle={username}
          setIsModalOpened={setIsUpdateRoleModalOpened}
          apiEndpoint={`users/${userID}`}
          actionType="UPDATE_USER_ROLE"
          actionPayload={{ userID, role: selectedRole }}
          httpVerb="put"
          requestData={{
            role: selectedRole
          }}
        />
      )}
    </div>
  );
};

export default User;

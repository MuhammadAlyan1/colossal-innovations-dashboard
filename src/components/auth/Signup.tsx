import React, { useState, useContext } from 'react';
import FormGroup from '../shared/FormGroup';
import { AppContext } from '../../context/appContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const { dispatch } = useContext(AppContext);
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!username || !password || !confirmPassword) {
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

    if (password !== confirmPassword) {
      dispatch({
        type: 'DISPLAY_SNACKBAR',
        payload: {
          isOpen: true,
          message: 'Passwords do not match!',
          severity: 'warning'
        }
      });
      return;
    }

    const URL = `${process.env.REACT_APP_BASE_URL}users/register`;
    try {
      const response = await axios.post(URL, {
        username,
        password
      });
      if (response.data.success) {
        const { _id, username, role, registration_date } = response.data.data;
        dispatch({
          type: 'DISPLAY_SNACKBAR',
          payload: {
            isOpen: true,
            message: 'Account created',
            severity: 'success'
          }
        });

        dispatch({
          type: 'SIGN_IN',
          payload: {
            userID: _id,
            username,
            role,
            registration_date
          }
        });

        navigate('/');
      } else {
        throw new Error('Something went wrong with account creation');
      }
    } catch (error: any) {
      console.log(error);
      dispatch({
        type: 'DISPLAY_SNACKBAR',
        payload: {
          isOpen: true,
          message:
            error?.response?.data?.message || 'Failed to create account!',
          severity: 'error'
        }
      });
    }
  };

  return (
    <form className="signup-form" onSubmit={handleSubmit}>
      <h1 className="signup-form__heading">Create your account</h1>
      <FormGroup
        label="Username"
        placeholder="Enter username"
        state={username}
        setState={setUsername}
        variant="standard"
      />
      <FormGroup
        label="Password"
        placeholder="Enter password"
        state={password}
        setState={setPassword}
        variant="standard"
        type="password"
      />
      <FormGroup
        label="Repeat password"
        placeholder="Repeat password"
        state={confirmPassword}
        setState={setConfirmPassword}
        variant="standard"
        type="password"
      />
      <button type="submit" className="signup-form__submit-button">
        Create an account
      </button>
      <p className="signup-form__note">
        Already have an account?{' '}
        <button
          type="button"
          className="button--text"
          onClick={() => {
            navigate('/signin');
            window.scrollTo(0, 0);
          }}
        >
          Sign in
        </button>
      </p>
    </form>
  );
};

export default Signup;

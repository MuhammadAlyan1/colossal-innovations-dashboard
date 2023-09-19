import React, { useState, useContext } from 'react';
import FormGroup from '../shared/FormGroup';
import { AppContext } from '../../context/appContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signin = () => {
  const { dispatch } = useContext(AppContext);
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!username || !password) {
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

    const URL = `${process.env.REACT_APP_BASE_URL}users/login`;
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
            message: 'Logged in!',
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
        throw new Error('Something went wrong with sign in!');
      }
    } catch (error: any) {
      console.log(error);
      dispatch({
        type: 'DISPLAY_SNACKBAR',
        payload: {
          isOpen: true,
          message: error?.response?.data?.message || 'Failed to sign in!',
          severity: 'error'
        }
      });
    }
  };

  return (
    <form className="signin-form" onSubmit={handleSubmit}>
      <h1 className="signin-form__heading">Welcome back</h1>
      <p className="signin-form__action">Please enter your details.</p>
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

      <button type="submit" className="signin-form__submit-button">
        Sign in
      </button>
      <p className="signin-form__note">
        Don't have an account yet?{' '}
        <button
          type="button"
          className="button--text"
          onClick={() => {
            navigate('/signup');
            window.scrollTo(0, 0);
          }}
        >
          Sign up
        </button>
      </p>
    </form>
  );
};

export default Signin;

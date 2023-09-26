import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { AppContext } from '../../context/appContext';

import blogsIcon from '../../assets/blogs-icon.png';
import careersIcon from '../../assets/careers-icon.png';
import usersIcon from '../../assets/users-icon.png';
import projectsIcon from '../../assets/projects-icon.png';
import emailsIcon from '../../assets/emails-icon.png';
import careerApplicationsIcon from '../../assets/Careers-applications-icon.png';

import OverviewCard from './OverviewCard';
import axios from 'axios';

const Dashboard = () => {
  const {
    state: { user, overview },
    dispatch
  } = useContext(AppContext);

  useEffect(() => {
    const URL = `${process.env.REACT_APP_BASE_URL}overview/`;

    const fetchData = async (URL: string): Promise<void> => {
      try {
        const response = await axios.get(URL);
        dispatch({ type: 'SET_OVERVIEW', payload: response.data.data });
      } catch (error: any) {
        dispatch({
          type: 'DISPLAY_SNACKBAR',
          payload: {
            isOpen: true,
            message:
              error?.response?.data?.message || 'Unable to retrieve overview',
            severity: 'error'
          }
        });
        console.log(error);
      }
    };

    fetchData(URL);
  }, []);

  const overviewCardsData = [
    {
      icon: blogsIcon,
      name: 'Blog posts',
      value: overview.blogs
    },
    {
      icon: careersIcon,
      name: 'Careers',
      value: overview.careers
    },
    {
      icon: usersIcon,
      name: 'Users',
      value: overview.users
    },
    {
      icon: projectsIcon,
      name: 'Projects',
      value: overview.projects
    },
    {
      icon: emailsIcon,
      name: 'Emails',
      value: overview.emails
    },
    {
      icon: careerApplicationsIcon,
      name: 'Career Applications',
      value: overview.careerApplications
    }
  ];

  const navigate = useNavigate();

  const handleSignOut = () => {
    dispatch({
      type: 'SIGN_OUT',
      payload: null
    });

    dispatch({
      type: 'DISPLAY_SNACKBAR',
      payload: {
        isOpen: true,
        message: 'Logged out!',
        severity: 'success'
      }
    });

    navigate('/signin');
  };

  return (
    <section className="dashboard">
      <div className="dashboard__header">
        <div className="dashboard__user-container">
          <p className="dashboard__greet">Welcome back</p>
          <p className="dashboard__user">
            {user.username}
            <span
              className={`dashboard__user-role dashboard__user-role--${user.role}`}
            >
              {user.role}
            </span>
          </p>
        </div>
        <button className="dashboard__signout-button" onClick={handleSignOut}>
          Sign out
        </button>
      </div>
      <div className="dashboard__cards">
        {overviewCardsData.map((cardData) => (
          <OverviewCard key={cardData.name} {...cardData} />
        ))}
      </div>
    </section>
  );
};

export default Dashboard;

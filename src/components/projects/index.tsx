import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { IoMdAdd } from 'react-icons/io';

import { AppContext } from '../../context/appContext';
import { useNavigate } from 'react-router-dom';
import Project from './Project';

function Projects() {
  const Navigate = useNavigate();
  const {
    state: { projects },
    dispatch
  } = useContext(AppContext);

  useEffect(() => {
    const URL = `${process.env.REACT_APP_BASE_URL}projects/`;

    const fetchData = async (URL: string): Promise<void> => {
      try {
        const response = await axios.get(URL);
        dispatch({ type: 'SET_PROJECTS', payload: response.data.data });
      } catch (error: any) {
        dispatch({
          type: 'DISPLAY_SNACKBAR',
          payload: {
            isOpen: true,
            message:
              error?.response?.data?.message || 'Unable to retrieve projects',
            severity: 'error'
          }
        });
        console.log(error);
      }
    };

    fetchData(URL);
  }, []);

  return (
    <section className="projects">
      <div className="section-header">
        <h1 className="section-header__title">Projects</h1>
        <button
          className="section-header__submit-button"
          onClick={() => {
            Navigate(`/projects/create/`);
            window.scrollTo(0, 0);
          }}
        >
          <IoMdAdd className="section-header__button-icon" />
          Create project
        </button>
      </div>
      <div className="projects__search"></div>
      <section className="projects__container">
        {projects?.map((project) => {
          return <Project key={project.title} {...project} />;
        })}
      </section>
    </section>
  );
}

export default Projects;

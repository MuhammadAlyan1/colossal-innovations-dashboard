import React, { useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/appContext';
import ProjectDetails from '../components/projects/ProjectDetails';

const ProjectDetailsPage = () => {
  const {
    state: { projects },
    dispatch,
  } = useContext(AppContext);
  const navigate = useNavigate();
  const { projectID } = useParams();

  useEffect(() => {
    if (!projectID) {
      navigate('/404');
    }
  }, [projectID]);

  const project = projects.find((project) => project._id === projectID);

  if (!project) {
    dispatch({
      type: 'DISPLAY_SNACKBAR',
      payload: {
        isOpen: true,
        message: 'Project does not exists!',
        severity: 'error',
      },
    });
    navigate('/404');
    return null;
  }

  return <ProjectDetails {...project} />;
};

export default ProjectDetailsPage;

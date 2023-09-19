import React, { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import { ProjectType } from '../../types/ProjectType';

const ProjectDetails = (project: ProjectType) => {
  return (
    <div className="markdown-component">
      <div className="markdown-component__image-container">
        <img
          className="markdown-component__image"
          src={project.image}
          alt={project.title}
        />
      </div>
      <ReactMarkdown
        className="markdown-body"
        children={project.contents}
        remarkPlugins={[remarkGfm]}
      />
    </div>
  );
};

export default ProjectDetails;

import React, { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import { BlogType } from '../../types/BlogType';

const BlogDetails = (blog: BlogType) => {
  return (
    <div className="markdown-component">
      <div className="markdown-component__image-container">
        <img
          className="markdown-component__image"
          src={blog.image}
          alt={blog.title}
        />
      </div>
      <ReactMarkdown
        className="markdown-body"
        children={blog.contents}
        remarkPlugins={[remarkGfm]}
      />
    </div>
  );
};

export default BlogDetails;

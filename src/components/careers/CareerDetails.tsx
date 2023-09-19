import React, { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import { CareerType } from '../../types/CareerType';

const CareerDetails = (career: CareerType) => {
  return (
    <div className="markdown-component">
      <ReactMarkdown
        className="markdown-body"
        children={career.contents}
        remarkPlugins={[remarkGfm]}
      />
    </div>
  );
};

export default CareerDetails;

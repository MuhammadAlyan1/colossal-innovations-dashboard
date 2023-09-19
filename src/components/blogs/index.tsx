import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { IoMdAdd } from 'react-icons/io';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { BlogType } from '../../types/BlogType';
import BlogDetails from './BlogDetails';
import Blog from './Blog';
import { AppContext } from '../../context/appContext';
import { useNavigate } from 'react-router-dom';

function Blogs() {
  const Navigate = useNavigate();
  const {
    state: { blogs },
    dispatch
  } = useContext(AppContext);

  const [blogContents, setBlogContents] = useState('');

  useEffect(() => {
    const URL = `${process.env.REACT_APP_BASE_URL}blogs/`;

    const fetchData = async (URL: string): Promise<void> => {
      try {
        const response = await axios.get(URL);
        dispatch({ type: 'SET_BLOGS', payload: response.data.data });
      } catch (error: any) {
        dispatch({
          type: 'DISPLAY_SNACKBAR',
          payload: {
            isOpen: true,
            message:
              error?.response?.data?.message || 'Unable to retrieve blogs',
            severity: 'error'
          }
        });
        console.log(error);
      }
    };

    fetchData(URL);
  }, []);

  return (
    <section className="blogs">
      <div className="section-header">
        <h1 className="section-header__title">Blogs</h1>
        <button
          className="section-header__submit-button"
          onClick={() => {
            Navigate(`/blogs/create/`);
            window.scrollTo(0, 0);
          }}
        >
          <IoMdAdd className="section-header__button-icon" />
          Create blog
        </button>
      </div>
      <div className="blogs__search"></div>
      <section className="blogs__container">
        {blogs?.map((blog) => {
          return <Blog key={blog.title} {...blog} />;
        })}
      </section>
    </section>
  );
}

export default Blogs;

import React, { useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/appContext';
import BlogDetails from '../components/blogs/BlogDetails';

const BlogDetailsPage = () => {
  const {
    state: { blogs },
    dispatch
  } = useContext(AppContext);
  const navigate = useNavigate();
  const { blogID } = useParams();

  useEffect(() => {
    if (!blogID) {
      navigate('/404');
    }
  }, [blogID]);

  const blog = blogs.find((blog) => blog._id === blogID);

  if (!blog) {
    dispatch({
      type: 'DISPLAY_SNACKBAR',
      payload: {
        isOpen: true,
        message: 'Blog does not exists!',
        severity: 'error'
      }
    });
    navigate('/404');
    return null;
  }

  return <BlogDetails {...blog} />;
};

export default BlogDetailsPage;

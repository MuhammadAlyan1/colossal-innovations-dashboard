import React, { useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/appContext';
import UpdateBlog from '../components/blogs/UpdateBlog';

const BlogUpdatePage = () => {
  const {
    state: { blogs, user },
    dispatch
  } = useContext(AppContext);
  const navigate = useNavigate();
  const { blogID } = useParams();

  const { userID } = user;

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

  return <UpdateBlog blog={blog} userID={userID} />;
};

export default BlogUpdatePage;

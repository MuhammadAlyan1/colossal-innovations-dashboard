import { useState, useEffect, useReducer, createContext } from 'react';

import Blogs from './components/blogs';
import CreateBlog from './components/blogs/CreateBlog';
import UpdateBlog from './components/blogs/UpdateBlog';

import Snackbar from './components/shared/Snackbar';
import Signup from './components/auth/Signup';
import Signin from './components/auth/Signin';
import ConfirmModal from './components/shared/ConfirmModal';
import ThemeSwitcher from './components/themeSwitcher';

import { AppProvider } from './context/appContext';
import Careers from './components/careers';
import CreateCareer from './components/careers/CreateCareer';
import BlogDetails from './components/blogs/BlogDetails';
import UpdateCareer from './components/careers/UpdateCareer';
import Navigation from './components/navigation';

import SharedLayout from './pages/SharedLayout';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './components/dashboard';
import Error from './components/Error';
import BlogDetailsPage from './pages/BlogDetailsPage';
import BlogUpdatePage from './pages/BlogUpdatePage';
import CareerDetailsPage from './pages/CareerDetailsPage';
import CareerUpdatePage from './pages/CareerUpdatePage';

import { useLocation } from 'react-router-dom';
import Projects from './components/projects';
import CreateProject from './components/projects/CreateProject';
import ProjectDetailsPage from './pages/ProjectDetailsPage';
import ProjectUpdatePage from './pages/ProjectUpdatePage';
import Users from './components/users';
import Email from './components/emails/Email';
import Emails from './components/emails';
import EmailDetailsPage from './pages/EmailDetailsPage';

function App() {
  return (
    <AppProvider>
      <div className="App">
        {/* <CreateBlog />
        <Blogs />
        <UpdateBlog />
        <Signup />
        <Signin />
        <CreateCareer />
        <UpdateCareer />
        <Careers />
        <Navigation />
        <Snackbar /> */}

        <BrowserRouter>
          <Routes>
            <Route path="/" element={<SharedLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="/signin" element={<Signin />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/users" element={<Users />} />
              <Route path="/blogs" element={<Blogs />} />
              <Route path="blogs/create/" element={<CreateBlog />} />
              <Route path="blogs/view/:blogID" element={<BlogDetailsPage />} />
              <Route path="blogs/update/:blogID" element={<BlogUpdatePage />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="projects/create/" element={<CreateProject />} />
              <Route
                path="projects/view/:projectID"
                element={<ProjectDetailsPage />}
              />
              <Route
                path="projects/update/:projectID"
                element={<ProjectUpdatePage />}
              />
              <Route path="/careers" element={<Careers />} />
              <Route path="/careers/create/" element={<CreateCareer />} />
              <Route
                path="careers/view/:careerID"
                element={<CareerDetailsPage />}
              />
              <Route
                path="careers/update/:careerID"
                element={<CareerUpdatePage />}
              />
              <Route path="emails" element={<Emails />} />
              <Route
                path="emails/view/:emailID"
                element={<EmailDetailsPage />}
              />
            </Route>
            <Route path="*" element={<Error />} />
          </Routes>
        </BrowserRouter>
      </div>
    </AppProvider>
  );
}

export default App;

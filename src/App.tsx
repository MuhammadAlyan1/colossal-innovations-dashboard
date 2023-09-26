import Blogs from './components/blogs';
import CreateBlog from './components/blogs/CreateBlog';

import Signup from './components/auth/Signup';
import Signin from './components/auth/Signin';

import { AppProvider } from './context/appContext';
import Careers from './components/careers';
import CreateCareer from './components/careers/CreateCareer';

import SharedLayout from './pages/SharedLayout';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './components/dashboard';
import Error from './components/Error';
import BlogDetailsPage from './pages/BlogDetailsPage';
import BlogUpdatePage from './pages/BlogUpdatePage';
import CareerDetailsPage from './pages/CareerDetailsPage';
import CareerUpdatePage from './pages/CareerUpdatePage';

import Projects from './components/projects';
import CreateProject from './components/projects/CreateProject';
import ProjectDetailsPage from './pages/ProjectDetailsPage';
import ProjectUpdatePage from './pages/ProjectUpdatePage';
import Users from './components/users';
import Emails from './components/emails';
import EmailDetailsPage from './pages/EmailDetailsPage';
import CareerApplications from './components/careerApplications';
import CareerApplicationDetailsPage from './pages/CareerApplicationDetailsPage';

function App() {
  return (
    <AppProvider>
      <div className="App">
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
              <Route
                path="/career-applications"
                element={<CareerApplications />}
              />
              <Route
                path="/career-applications/view/:careerApplicationID"
                element={<CareerApplicationDetailsPage />}
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

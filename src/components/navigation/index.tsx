import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

import dashboardIcon from '../../assets/dashboard-icon.png';
import careersIcon from '../../assets/careers-icon.png';
import blogsIcon from '../../assets/blogs-icon.png';
import themesIcon from '../../assets/theme-icon.png';
import projectIcon from '../../assets/projects-icon.png';
import usersIcon from '../../assets/users-icon.png';
import emailsIcon from '../../assets/emails-icon.png';
import careerApplicationsIcon from '../../assets/Careers-applications-icon.png';

import { IoMdClose } from 'react-icons/io';
import { GiHamburgerMenu } from 'react-icons/gi';
import ThemeSwitcher from '../themeSwitcher';

const Navigation = () => {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  return (
    <>
      {!isNavbarOpen && (
        <GiHamburgerMenu
          className="navigation__button navigation__button--open"
          onClick={() => setIsNavbarOpen((prev) => !prev)}
        />
      )}
      <nav
        className={`navigation ${
          isNavbarOpen ? 'navigation--visible' : 'navigation--hidden'
        }`}
      >
        <IoMdClose
          className="navigation__button navigation__button--close"
          onClick={() => setIsNavbarOpen((prev) => !prev)}
        />
        <NavLink
          onClick={() => window.scrollTo(0, 0)}
          to="/"
          className={({ isActive }) =>
            isActive
              ? 'navigation__element navigation__element--active'
              : 'navigation__element'
          }
        >
          <img className="navigation__icon" src={dashboardIcon} />
          <span className="navigation__text">Dashboard</span>
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? 'navigation__element navigation__element--active'
              : 'navigation__element'
          }
          onClick={() => window.scrollTo(0, 0)}
          to="/blogs"
        >
          <img className="navigation__icon" src={blogsIcon} />
          <span className="navigation__text">Blogs</span>
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? 'navigation__element navigation__element--active'
              : 'navigation__element'
          }
          onClick={() => window.scrollTo(0, 0)}
          to="/projects"
        >
          <img className="navigation__icon" src={projectIcon} />
          <span className="navigation__text">Projects</span>
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? 'navigation__element navigation__element--active'
              : 'navigation__element'
          }
          onClick={() => window.scrollTo(0, 0)}
          to="/careers"
        >
          <img className="navigation__icon" src={careersIcon} />
          <span className="navigation__text">Careers</span>
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? 'navigation__element navigation__element--active'
              : 'navigation__element'
          }
          onClick={() => window.scrollTo(0, 0)}
          to="/career-applications"
        >
          <img className="navigation__icon" src={careerApplicationsIcon} />
          <span className="navigation__text">Applicants</span>
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? 'navigation__element navigation__element--active'
              : 'navigation__element'
          }
          onClick={() => window.scrollTo(0, 0)}
          to="/users"
        >
          <img className="navigation__icon" src={usersIcon} />
          <span className="navigation__text">Users</span>
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? 'navigation__element navigation__element--active'
              : 'navigation__element'
          }
          onClick={() => window.scrollTo(0, 0)}
          to="/emails"
        >
          <img className="navigation__icon" src={emailsIcon} />
          <span className="navigation__text">Emails</span>
        </NavLink>

        <div className="navigation__theme">
          <img className="navigation__icon" src={themesIcon} />
          <ThemeSwitcher />
        </div>
      </nav>
    </>
  );
};

export default Navigation;

import React, { useState, useContext } from 'react';

import { FaSun } from 'react-icons/fa';
import { BsFillMoonFill } from 'react-icons/bs';
import { AppContext } from '../../context/appContext';

const ThemeSwitcher = () => {
  const {
    state: { theme },
    dispatch,
  } = useContext(AppContext);

  const handleThemeSwitch = () => {
    dispatch({ type: 'CHANGE_THEME', payload: null });
    dispatch({
      type: 'DISPLAY_SNACKBAR',
      payload: {
        isOpen: true,
        message: `${
          theme === 'dark' ? 'Light theme selected!' : 'Dark theme selected!'
        }`,
        severity: 'info',
      },
    });
  };

  return (
    <div className="theme-switcher">
      <input
        type="checkbox"
        className="theme-switcher__checkbox"
        id="checkbox"
        checked={theme === 'dark' ? true : false}
        onChange={handleThemeSwitch}
      />
      <label htmlFor="checkbox" className="theme-switcher__checkbox-label">
        <i className="fas fa-moon"></i>
        <i className="fas fa-sun"></i>
        <FaSun className="theme-switcher__icon theme-switcher__icon--sun" />
        <BsFillMoonFill className="theme-switcher__icon theme-switcher__icon--moon" />
        <span className="theme-switcher__ball"></span>
      </label>
    </div>
  );
};

export default ThemeSwitcher;

import React, { createContext, useReducer, Dispatch } from 'react';
import { reducer } from '../reducer';
import { SnackbarType } from '../types/SnackbarType';
import { InitialStateType } from '../types/InitialStateType';
import { ActionType } from '../types/ActionType';

export const initialState: InitialStateType = {
  theme: 'dark',
  user: {
    userID: '',
    username: '',
    role: 'user',
    registration_date: new Date()
  },
  overview: {
    blogs: 0,
    careers: 0,
    emails: 0,
    projects: 0,
    users: 0
  },
  users: [],
  blogs: [],
  careers: [],
  projects: [],
  emails: [],
  snackbar: {
    message: '',
    severity: 'info',
    isOpen: false
  }
};

const AppContext = createContext<{
  state: InitialStateType;
  dispatch: Dispatch<ActionType>;
}>({
  state: initialState,
  dispatch: () => null
});

const AppProvider: any = (props: any) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {props.children}
    </AppContext.Provider>
  );
};

export { AppProvider, AppContext };

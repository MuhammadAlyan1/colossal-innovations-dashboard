import { InitialStateType } from './types/InitialStateType';
import { ActionType } from './types/ActionType';

export const reducer = (
  state: InitialStateType,
  action: ActionType
): InitialStateType => {
  switch (action.type) {
    // -----------------------
    // THEME
    // -----------------------

    case 'CHANGE_THEME': {
      const newTheme = state.theme === 'dark' ? 'light' : 'dark';
      document.documentElement.className = '';
      document.documentElement.classList.add(`theme-${newTheme}`);
      return {
        ...state,
        theme: newTheme
      };
    }

    // -----------------------
    // AUTHENICATION
    // -----------------------

    case 'SIGN_IN': {
      return {
        ...state,
        user: action.payload
      };
    }

    case 'SIGN_OUT': {
      return {
        ...state,
        user: {
          userID: '',
          username: '',
          role: 'user',
          registration_date: new Date()
        }
      };
    }

    // -----------------------
    // SNACKBAR
    // -----------------------

    case 'DISPLAY_SNACKBAR': {
      const { message, isOpen, severity } = action.payload;
      return {
        ...state,
        snackbar: {
          message,
          isOpen,
          severity
        }
      };
    }

    case 'HIDE_SNACKBAR': {
      return {
        ...state,
        snackbar: {
          message: state.snackbar.message,
          isOpen: false,
          severity: state.snackbar.severity
        }
      };
    }

    // -----------------------
    // OVERVIEW
    // -----------------------

    case 'SET_OVERVIEW': {
      return {
        ...state,
        overview: action.payload
      };
    }

    // -----------------------
    // USERS
    // -----------------------

    case 'SET_USERS': {
      return {
        ...state,
        users: action.payload
      };
    }

    case 'UPDATE_USER_ROLE': {
      const newUsers = state.users.map((user) => {
        if (user.userID === action.payload.userID) {
          return {
            ...user,
            role: action.payload.role
          };
        } else {
          return user;
        }
      });

      return {
        ...state,
        users: newUsers
      };
    }

    case 'DELETE_USER': {
      const newUsers = state.users.filter(
        (user) => user.userID !== action.payload
      );

      return {
        ...state,
        users: newUsers
      };
    }

    // -----------------------
    // BLOGS
    // -----------------------

    case 'SET_BLOGS': {
      return {
        ...state,
        blogs: action.payload
      };
    }

    case 'CREATE_BLOG': {
      return {
        ...state,
        blogs: [action.payload, ...state.blogs]
      };
    }

    case 'UPDATE_BLOG': {
      const newBlogs = state.blogs.map((blog) => {
        if (blog._id === action.payload._id) {
          return action.payload;
        } else {
          return blog;
        }
      });

      return {
        ...state,
        blogs: newBlogs
      };
    }

    case 'DELETE_BLOG': {
      const newBlogs = state.blogs.filter(
        (blog) => blog._id !== action.payload
      );

      return {
        ...state,
        blogs: newBlogs
      };
    }

    // -----------------------
    // PROJECTS
    // -----------------------

    case 'SET_PROJECTS': {
      return {
        ...state,
        projects: action.payload
      };
    }

    case 'CREATE_PROJECT': {
      return {
        ...state,
        projects: [action.payload, ...state.projects]
      };
    }

    case 'UPDATE_PROJECT': {
      const newProjects = state.projects.map((project) => {
        if (project._id === action.payload._id) {
          return action.payload;
        } else {
          return project;
        }
      });

      return {
        ...state,
        projects: newProjects
      };
    }

    case 'DELETE_PROJECT': {
      const newProjects = state.projects.filter(
        (project) => project._id !== action.payload
      );

      return {
        ...state,
        projects: newProjects
      };
    }

    // -----------------------
    // CAREERS
    // -----------------------

    case 'SET_CAREERS': {
      return {
        ...state,
        careers: action.payload
      };
    }

    case 'CREATE_CAREER': {
      return {
        ...state,
        careers: [action.payload, ...state.careers]
      };
    }

    case 'UPDATE_CAREER': {
      const newCareers = state.careers.map((career) => {
        if (career._id === action.payload._id) {
          return action.payload;
        } else {
          return career;
        }
      });

      return {
        ...state,
        careers: newCareers
      };
    }

    case 'DELETE_CAREER': {
      const newCareers = state.careers.filter(
        (career) => career._id !== action.payload
      );

      return {
        ...state,
        careers: newCareers
      };
    }

    // -----------------------
    // EMAILS
    // -----------------------

    case 'SET_EMAILS': {
      return {
        ...state,
        emails: action.payload
      };
    }

    case 'DELETE_EMAIL': {
      const newEmails = state.emails.filter(
        (email) => email._id !== action.payload
      );
      return {
        ...state,
        emails: newEmails
      };
    }

    default:
      throw new Error(`Action type ${action} does not exists`);
  }
};

import { BlogType } from './BlogType';
import { CareerType } from './CareerType';
import { SnackbarType } from './SnackbarType';
import { UserType } from './UserType';
import { ProjectType } from './ProjectType';
import { EmailType } from './EmailType';
import { OverviewType } from './OverviewType';
import { CareerApplicationType } from './CareerApplicationType';
import { ApplicationStatusType } from './ApplicationStatusType';

export type ActionType =
  | { type: 'CHANGE_THEME'; payload: null }
  | { type: 'SIGN_IN'; payload: UserType }
  | { type: 'SIGN_OUT'; payload: null }
  | { type: 'DISPLAY_SNACKBAR'; payload: SnackbarType }
  | { type: 'HIDE_SNACKBAR'; payload: null }
  | { type: 'SET_OVERVIEW'; payload: OverviewType }
  | { type: 'SET_USERS'; payload: UserType[] }
  | { type: 'DELETE_USER'; payload: string }
  | {
      type: 'UPDATE_USER_ROLE';
      payload: { role: 'user' | 'moderator' | 'admin'; userID: string };
    }
  | { type: 'SET_BLOGS'; payload: BlogType[] }
  | { type: 'CREATE_BLOG'; payload: BlogType }
  | { type: 'UPDATE_BLOG'; payload: BlogType }
  | { type: 'DELETE_BLOG'; payload: string }
  | { type: 'SET_PROJECTS'; payload: ProjectType[] }
  | { type: 'CREATE_PROJECT'; payload: ProjectType }
  | { type: 'UPDATE_PROJECT'; payload: ProjectType }
  | { type: 'DELETE_PROJECT'; payload: string }
  | { type: 'SET_CAREERS'; payload: CareerType[] }
  | { type: 'CREATE_CAREER'; payload: CareerType }
  | { type: 'UPDATE_CAREER'; payload: CareerType }
  | { type: 'DELETE_CAREER'; payload: string }
  | { type: 'SET_CAREER_APPLICATIONS'; payload: CareerApplicationType[] }
  | { type: 'DELETE_CAREER_APPLICATION'; payload: string }
  | {
      type: 'UPDATE_CAREER_APPLICATION_STATUS';
      payload: { applicationStatus: ApplicationStatusType; _id: string };
    }
  | {
      type: 'UPDATE_CAREER_APPLICATION_NOTES';
      payload: CareerApplicationType;
    }
  | { type: 'SET_EMAILS'; payload: EmailType[] }
  | { type: 'DELETE_EMAIL'; payload: string };

import { BlogType } from './BlogType';
import { CareerApplicationType } from './CareerApplicationType';
import { CareerType } from './CareerType';
import { EmailType } from './EmailType';
import { OverviewType } from './OverviewType';
import { ProjectType } from './ProjectType';
import { SnackbarType } from './SnackbarType';
import { UserType } from './UserType';

export type InitialStateType = {
  theme: 'dark' | 'light';
  user: UserType;
  overview: OverviewType;
  users: UserType[] | [];
  blogs: BlogType[] | [];
  careerApplications: CareerApplicationType[] | [];
  careers: CareerType[] | [];
  projects: ProjectType[] | [];
  emails: EmailType[] | [];
  snackbar: SnackbarType;
};

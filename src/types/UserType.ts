export type UserType = {
  userID: string;
  username: string;
  role: 'user' | 'moderator' | 'admin';
  registration_date: Date;
};

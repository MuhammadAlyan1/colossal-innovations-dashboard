export type EmailType = {
  _id: string;
  name: string;
  email: string;
  message: string;
  subject: string;
  isRead: boolean;
  hasReplied: boolean;
  createdAt: string;
  parentEmail: string;
};

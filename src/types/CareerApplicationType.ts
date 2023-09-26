export type CareerApplicationType = {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
  resumeURL: string;
  createdAt: string;
  additionalNotes: string;
  applicationStatus:
    | 'SUBMITTED'
    | 'SHORTLISTED'
    | 'REJECTED'
    | 'INTERVIEW SCHEDULED'
    | 'OFFER EXTENDED'
    | 'HIRED';

  career: string;
};

export type BlogType = {
  _id: string;
  image: string;
  title: string;
  description: string;
  contents: string;
  tags: string[];
  userID: string;
  publication_date: Date;
};

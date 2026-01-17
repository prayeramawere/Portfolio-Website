export type blog = {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  link: string;
  category: string;
};

export type comment = {
  blogID: number;
  id: number;
  date: string;
  comment: string;
  author: string;
  likes: string;
};
 export type AdminData = {
    name?: string;
    role?: string;
    bio?: string;
    story?: string;
    skills?: string[];
    image?: string;
    category:string
  };
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
export type TestimonialCardType = {
  username: string;
  image: string;
  testimony: string;
  date: string;
  category?:string
};
export type BlogCardType = {
  id:string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  link:string
  category?:string
};
 export type PrivateAdminData = {
    id:string
    name?: string;
    role?: string;
    bio?: string;
    story?: string;
    skills?: string[];
    image?: string;
    category?:string
    unique_code1:string;
    unique_code2:string;
  };
  export type AdminRes = {
    success: boolean;
    msg?: string;
    data: AdminData;
  };
  export type BlogRes = {
    success: boolean;
    msg?: string;
    data: BlogCardType[];
  };

  export type TestimonialRes = {
    success: boolean;
    msg?: string;
    data:TestimonialCardType [];
  };
  type Project = {
name:string
link:string
image:string
description:string
category:string}

  export type Highlights =
  | { type: "blog"; data: BlogCardType }
  | { type: "testimonial"; data: TestimonialCardType }
  | { type: "project"; data: Project }
  | { type: "publicAdmin"; data: AdminData };

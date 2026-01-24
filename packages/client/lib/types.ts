 export type AdminData = {
    name?: string;
    role?: string;
    bio?: string;
    story?: string;
    image?: string;
  };
  export type blog = {
  id: number;
  _created_at:string;
  category:string;
  title: string;
  subtitle: string;
  _message: string;
  _image: string;
  link: string;
  likes:number;
  views:number;
};

export type comment = {
  blogID: number;
  id: number;
  _created_at: string;
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
  id: number;
  _created_at:string;
  category:string;
  title: string;
  subtitle: string;
  _message: string;
  _image: string;
  link: string;
  likes:number;
  views:number;
};
 export type PrivateAdminData = {
    id:string
    username?: string;
    _role?: string;
    bio?: string;
    story?: string;
    _image?: string;
    unique_code1:string;
    unique_code2:string;
  };
  export type AdminRes = {
    success: boolean;
    msg?: string;
    data: AdminData;
  };
  export type CommentsRes = {
    success: boolean;
    msg?: string;
    data: comment[];
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
    title:string 
    _description:string
    benefit1:string
    benefit2:string
    benefit3:string
    link:string
    _image:string

}

  export type Highlights =
  | { type: "blog"; data: BlogCardType }
  | { type: "testimonial"; data: TestimonialCardType }
  | { type: "project"; data: Project }
  | { type: "publicAdmin"; data: AdminData };

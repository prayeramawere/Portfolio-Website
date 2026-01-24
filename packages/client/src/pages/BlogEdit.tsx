import { useSearchParams } from "react-router-dom";
import { useActionState, useEffect, useState } from "react";
import BaseNav from "@/components/BaseNav";
import BlogForm from "@/components/BlogForm";

type blog = {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  link: string;
  category: string;
};

function BlogEdit() {
  const [searchParams] = useSearchParams();
  const [blogs, setBlogs] = useState<blog[]>([]);
  const id = searchParams.get("id");

  const getBlogs = async () => {
    const response = await fetch("http://localhost:5000/blog");
    if (!response.ok) {
      console.log(
        `error occured wie trying to get response: ${response.statusText}`,
      );
    }

    const data = await response.json();
    console.log(data);
    setBlogs(await data.data);
  };

  const token = localStorage.getItem("token");

  useEffect(() => {
    getBlogs();
  }, []);

  const blog = blogs.find((blog: blog) => blog.id == Number(id));

  return (
    <>
      <BaseNav />
      <div className="flex justify-center items-center">
        {" "}
        <div className="bg-background w-ful mt-3 flex overflow-y-scroll no-scrollbar w-[50%]">
          <BlogForm id={Number(id)} token={token || " "} />
        </div>{" "}
      </div>
    </>
  );
}

export default BlogEdit;

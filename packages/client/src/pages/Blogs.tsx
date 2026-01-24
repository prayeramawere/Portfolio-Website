import React, { useEffect } from "react";
import { useState } from "react";
import type {
  AdminRes,
  AdminData,
  BlogRes,
  BlogCardType,
  CommentsRes,
} from "../../lib/types";
import MultiBlogCard from "../components/MultiBlogCardC";
import SearchForm from "../components/SearchForm";
import { Link, useSearchParams } from "react-router-dom";
import BlogCard from "@/components/BlogCard";
import FloatingNav from "@/components/FloatingNav";
import Footer from "@/components/Footer";
import BaseNav from "@/components/BaseNav";
import FloatingSocial from "@/components/FloatingSocial";

export default function BlogsEdit() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";

  const [admin, setAdmin] = useState<AdminRes | null>(null);
  const [blogs, setBlogs] = useState<BlogRes | null>(null);
  const [comments, setComments] = useState<CommentsRes | null>(null);

  const getAdmin = async () => {
    const response = await fetch(
      "http://localhost:5000/secure/12ew/admin/public",
    );
    if (!response.ok) {
      throw new Error(`problem while fetching admin ${response.status}`);
    }
    const data = await response.json();

    setAdmin(data as AdminRes);
  };
  const getComments = async () => {
    const response = await fetch("http://localhost:5000/comment");
    if (!response.ok) {
      throw new Error(`problem while fetching comments ${response.status}`);
    }
    const data = await response.json();

    setComments(data as CommentsRes);
  };

  const getBlogs = async () => {
    const response = await fetch("http://localhost:5000/blog");
    if (!response.ok) {
      throw new Error(`problem while dfetching blogs ${response.status}`);
    }
    const data = await response.json();

    setBlogs(data as BlogRes);
  };
  useEffect(() => {
    getComments();
    getAdmin();
    getBlogs();
  }, []);

  const adminInfo = admin?.data;
  const blogData = blogs?.data;
  const commentsData = comments?.data;

  const image = adminInfo?.image;
  const url: string = "/admin/blogs/edit";
  console.log(query);

  const social = [
    {
      link: "#",
      url: "instagram",
    },
    {
      link: "#",
      url: "facebook",
    },
    {
      link: "#",
      url: "upwork",
    },
    {
      link: "#",
      url: "github",
    },
    {
      link: "#",
      url: "youtube",
    },
    {
      link: "#",
      url: "linkedin",
    },
  ];

  return (
    <>
      <BaseNav />
      <div className="w-full  flex r overflow-y-scroll no-scrollbar">
        <div className="md:w-[75%] w-full flex justify-center items-center flex-wrap">
          <div className="flex gap-2 w-full justify-center ml-2 mb-10 ">
            <SearchForm query={query} url={url} />
            <img
              src={"../../self.png"}
              alt=""
              className="sm:hidden w-[50px] h-[50px] rounded-full bg-primary mt-8 object-cover object-center"
            />
          </div>
          {query ? (
            <>
              {blogData
                ?.filter((blog) =>
                  [
                    blog.title,
                    blog.category,
                    blog._message,
                    blog.subtitle,
                  ].some((field) =>
                    field?.toLowerCase().includes(query.toLowerCase()),
                  ),
                )
                .map((blog: BlogCardType, index: number) => (
                  <BlogCard
                    blogs={blog}
                    key={index}
                    comments={commentsData || []}
                  />
                ))}
            </>
          ) : (
            <>
              {blogData?.map((blog: BlogCardType, index: number) => (
                <BlogCard
                  blogs={blog}
                  comments={commentsData || []}
                  key={index}
                />
              ))}{" "}
            </>
          )}
        </div>
        <div className="w-[25%]  py-4 md:flex flex-col  items-center hidden ">
          <div
            className="w-[100px] h-[100px] bg-white bg-cover bg-center mt-5 rounded-full "
            style={{ backgroundImage: `url(../../self.png)` }}
          ></div>
          <div className="mt-3 w-[80%]">
            <span className="text-white-faint">{adminInfo?.story}</span>
          </div>
          <div className="bottom-2 mb-2 flex fixed gap-2">
            {social.map((icon) => (
              <a key={icon.url} href={icon.link}>
                <img src={`../${icon.url}.png`} className=" social gap-3" />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="flex">
        <FloatingSocial social={social} />
        <FloatingNav />
      </div>

      <Footer currentYear={new Date().getFullYear()} />
    </>
  );
}

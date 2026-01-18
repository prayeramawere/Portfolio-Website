import React, { useEffect } from "react";
import { useState } from "react";
import type {
  AdminRes,
  AdminData,
  BlogRes,
  BlogCardType,
} from "../../lib/types";
import MultiBlogCard from "../components/MultiBlogCard";
import SearchForm from "../components/SearchForm";
import { useSearchParams } from "react-router-dom";

export default function BlogsEdit() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";

  const [admin, setAdmin] = useState<AdminRes | null>(null);
  const [blogs, setBlogs] = useState<BlogRes | null>(null);

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

  const getBlogs = async () => {
    const response = await fetch("http://localhost:5000/blog");
    if (!response.ok) {
      throw new Error(`problem while dfetching blogs ${response.status}`);
    }
    const data = await response.json();

    setBlogs(data as BlogRes);
  };
  useEffect(() => {
    getAdmin();
    getBlogs();
  }, []);

  const adminInfo = admin?.data;
  const blogData = blogs?.data;

  const image = adminInfo?.image;
  const url: string = "/admin/blogs/edit";
  console.log(query);

  return (
    <>
      <div className="flex justify-center items-center w-full">
        <div className="w-[95%] bg-element rounded-2xl h-[90vh] mt-10 flex r overflow-y-scroll no-scrollbar">
          <div className="md:w-[70%] w-full flex justify-center items-center flex-wrap">
            <div className="flex gap-2 w-full justify-center">
              <SearchForm query={query} url={url} />
              <img
                src={image}
                alt=""
                className="sm:hidden w-[50px] h-[50px] rounded-full bg-primary mt-8"
              />
            </div>
            {query ? (
              <>
                {blogData
                  ?.filter((blog) =>
                    [
                      blog.title,
                      blog.category,
                      blog.description,
                      blog.subtitle,
                    ].some((field) =>
                      field?.toLowerCase().includes(query.toLowerCase()),
                    ),
                  )
                  .map((blog) => (
                    <MultiBlogCard blogs={blog} />
                  ))}
              </>
            ) : (
              <>
                {blogData?.map((blog: BlogCardType) => (
                  <MultiBlogCard blogs={blog} />
                ))}{" "}
              </>
            )}
          </div>
          <div className="w-[30%] rounded-r-lg  bg-white md:flex flex-wrap justify-center hidden ">
            <div
              className="size-[200px] bg-black bg-cover bg-center rounded-full  mt-4"
              style={{ backgroundImage: `url(${image})` }}
            ></div>

            <header className="w-full flex flex-wrap text-black-faint  items-center justify-center">
              <h1 className="text-lg font-bold text-black">
                {adminInfo?.name}
              </h1>
              <span className="p-3">{adminInfo?.bio}</span>
            </header>
          </div>
        </div>
      </div>
    </>
  );
}

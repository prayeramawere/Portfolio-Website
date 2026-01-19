import type { BlogCardType } from "lib/types";
import React from "react";
import BlogCard from "./BlogCard";

function BlogSection({ blogData }: { blogData: BlogCardType[] }) {
  return (
    <>
      {blogData.length > 0 && (
        <section className="mt-10">
          <h1 className="uppercase font-primary-font text-right mr-4 text-element">
            Blogs & Articles
          </h1>
          <div className="flex ">
            <div className="grid grid-cols-1 justify-center p-5 sm:w-[80%] items-center w-full">
              {blogData.map((blog: BlogCardType) => (
                <BlogCard blogs={blog} />
              ))}
            </div>
            <div className="bg-out-secondary w-[20%] hidden md:block"></div>
          </div>
        </section>
      )}
    </>
  );
}

export default BlogSection;

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
          <div className="flex  justify-center flex-wrap">
            {blogData.map((blog: BlogCardType) => (
              <BlogCard blogs={blog} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}

export default BlogSection;

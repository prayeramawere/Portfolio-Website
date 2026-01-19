import type { BlogCardType, comment } from "lib/types";
import React from "react";
import BlogCard from "./BlogCard";
import BlogCategory from "./BlogCategory";

function BlogSection({
  blogData,
  comments,
}: {
  blogData: BlogCardType[];
  comments: comment[];
}) {
  const categories = Array.from(
    new Set(blogData.map((blog: BlogCardType) => blog.category)),
  ) as string[];

  console.log(categories);
  return (
    <>
      {blogData.length > 0 && (
        <section className="mt-10">
          <h1 className="uppercase font-primary-font text-right mr-4 text-element">
            Blogs & Articles
          </h1>
          <div className="flex ">
            <div className="flex justify-center items-center sm:w-[80%] w-full flex-col">
              {blogData.map((blog: BlogCardType) => (
                <BlogCard blogs={blog} comments={comments} />
              ))}
            </div>

            <div className=" w-[20%]  md:flex hidden">
              <div className="gap-4 p-4">
                {categories.map((category: string, index: number) => (
                  <BlogCategory category={category} key={index} />
                ))}
              </div>
              <h2>{/* Advertisement Space <br /> Your Ad Here */}</h2>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default BlogSection;

import React from "react";
import type { BlogCardType } from "../lib/types";
import { Link } from "react-router-dom";

function BlogCard({ blogs }: { blogs: BlogCardType }) {
  const { title, subtitle, description, image, link, id } = blogs;

  return (
    <center>
      <Link to={{ pathname: `/blog/${id}` }}>
        <div className="w-[80%] sm:w-[80%] flex flex-wrap sm:flex-nowrap mt-4 shadow-md rounded-lg border-l-3 border-primary hover:bg-white-faint/10 transition-all duration-300">
          <div className="w-full sm:w-[70%] p-2 sm:p-15 text-white  ">
            <div className="flex gap-5">
              <div
                className="sm:hidden size-[60px] bg-primary bg-cover bg-center rounded-lg"
                style={{ backgroundImage: `url(${image})` }}
              ></div>
              <span>
                <h1 className="font-bold text-lg sm:text-2xl">{title}</h1>
                <h2 className="font-semibold sm:text-lg text-sm mt-2 text-white-faint">
                  {subtitle}
                </h2>
              </span>
            </div>

            <p className="mt-4 text-white-faint text-sm">
              {description.split("").slice(0, 200)}{" "}
              <a
                href={`/blog/${id}`}
                className="text-blue-500  mt-4 inline-block hover:shadow-sm px-2 py-1 rounded-md"
              >
                Read More
              </a>
            </p>
          </div>
          <div className="w-full sm:w-[30%] flex justify-center items-center p-2 sm:p-10 ">
            <div
              className="hidden sm:block size-[200px] bg-primary bg-cover bg-center hover:bg-blue-300 rounded-lg transition-all duration-300"
              style={{ backgroundImage: `url(${image})` }}
            ></div>
          </div>
        </div>
      </Link>
    </center>
  );
}

export default BlogCard;

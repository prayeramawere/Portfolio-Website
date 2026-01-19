import React from "react";
import type { BlogCardType } from "../../lib/types";
import { Link } from "react-router-dom";
import { useInView } from "react-intersection-observer";

function BlogCard({ blogs }: { blogs: BlogCardType }) {
  const { title, subtitle, description, image, link, id } = blogs;
  const { ref, inView } = useInView();

  return (
    <Link to={{ pathname: `/blog/${id}` }}>
      <div
        ref={ref}
        className={` m-2 w-[80%] sm:w-[80%] flex flex-wrap sm:flex-nowrap mt-4 border-black-faint shadow-sm shadow-primary rounded-lg hover:bg-white-faint/10 hover:transition-all hover:duration-300 ${inView ? "animate-fadeInUp transition-all duration-500 delay-300" : ""} self-center`}
      >
        <div className="w-full sm:w-[70%] p-2 sm:p-6 text-white  ">
          <div className="flex gap-5">
            <div
              className="sm:hidden size-[60px] bg-primary bg-cover bg-center rounded-lg"
              style={{ backgroundImage: `url(${image})` }}
            ></div>
            <span>
              <h1 className="font-bold text-lg sm:text-lg text-white">
                {title}
              </h1>
              <h2 className="font-semibold sm:text-md text-sm mt-2 text-white-faint">
                {subtitle}
              </h2>
            </span>
          </div>

          <div className="mt-4 text-white-faint text-sm">
            {description.split("").slice(0, 100)}

            <div className="flex justify-between mt-4">
              <Link
                to={{ pathname: `/blog/${id}` }}
                className="text-blue-500   inline-block hover:shadow-sm px-2 py-1 rounded-md"
              >
                Read More
              </Link>
            </div>
          </div>
        </div>
        <div className="w-full sm:w-[30%] flex justify-center items-center p-2 sm:p-10 ">
          <div
            className="hidden sm:block size-[150px] bg-primary bg-cover bg-center hover:bg-blue-300 rounded-lg transition-all duration-300"
            style={{ backgroundImage: `url(${image})` }}
          ></div>
        </div>
      </div>
    </Link>
  );
}

export default BlogCard;

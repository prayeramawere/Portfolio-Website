import React from "react";
import { Link } from "react-router-dom";

import type { BlogCardType, comment } from "../../lib/types";
import { Eye, Heart, MessageCircleIcon } from "lucide-react";

function MultiBlogCard({
  blogs,
  comments,
}: {
  blogs: BlogCardType;
  comments: comment[] | [];
}) {
  const {
    id,
    _created_at,
    title,
    subtitle,
    _message,
    _image,
    link,
    likes,
    views,
  } = blogs;

  const token = localStorage.getItem("token");

  return (
    <Link to={{ pathname: `/blog/${id}` }}>
      <div className="flex flex-wrap -4 border-b border-primary/10  hover:rounded-lg hover:bg-white-faint/10 hover:transition-all hover:duration-300">
        <div
          className={` mx-auto w-full sm:w-[80%] flex flex-wrap sm:flex-nowrap `}
        >
          <div className="w-full sm:w-[70%] p-2 sm:p-6 text-white  ">
            <div className="flex gap-5">
              <div
                className="sm:hidden size-[60px] bg-primary bg-cover bg-center rounded-lg"
                style={{ backgroundImage: `url(${_image})` }}
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
              {_message.split("").slice(0, 100)}

              <div className="flex justify-between mt-4"></div>
            </div>
            <div className="w-full h-10 flex justify-end px-4 items-center gap-2 text-sm text-white-faint ">
              <span className="mr-auto">{_created_at}</span>
              <span className="flex gap-1 ">
                {likes}
                <Heart className="text-pink-600 size-5" />
              </span>

              {/* <span className="flex gap-1">
              {currentBlogComments.length}
              <MessageCircleIcon className="size-5" />
            </span> */}
              <span className="flex gap-1">
                {views}
                <Eye className="text-primary size-5 " />
              </span>
            </div>
          </div>
          <div className="w-full sm:w-[30%] flex justify-center items-center p-2 sm:p-10 ">
            <div
              className="hidden sm:block size-[150px] bg-primary bg-cover bg-center hover:bg-blue-300 rounded-lg transition-all duration-300"
              style={{ backgroundImage: `url(${_image})` }}
            ></div>
          </div>{" "}
        </div>

        <div className="flex gap-2 w-full">
          <button
            className="text-red-400 cursor-pointer hover:shadow-sm  px-2 py-1 rounded-md"
            onClick={async () => {
              const response = await fetch(
                `http://localhost:5000/blog/${id}/`,
                {
                  method: "delete",
                  headers: {
                    Authorization: `Bearer ${token}`,
                    type: "applicattion/json",
                  },
                },
              );
              console.log(await response.json());
            }}
          >
            Delete
          </button>
          <Link to={{ pathname: `/admin/user/edit/blog`, search: `?id=${id}` }}>
            {" "}
            <button className="text-primary cursor-pointer hover:shadow-sm px-2 py-1 rounded-md">
              edit
            </button>
          </Link>
        </div>
      </div>
    </Link>
  );
}

export default MultiBlogCard;

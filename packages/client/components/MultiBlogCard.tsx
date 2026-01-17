import React from "react";
import { Link } from "react-router-dom";

import type { BlogCardType } from "../lib/types";

function MultiBlogCard({ blogs }: { blogs: BlogCardType }) {
  const { id, title, subtitle, description, image, link } = blogs;

  const token = localStorage.getItem("token");

  return (
    // <center>
    <div className="w-[80%] sm:w-[80%] flex flex-wrap sm:flex-nowrap mt-4 border-black-faint shadow-sm rounded-lg hover:bg-white-faint/10 transition-all duration-300">
      <div className="w-full sm:w-[70%] p-2 sm:p-6 text-white  ">
        <div className="flex gap-5">
          <div
            className="sm:hidden size-[60px] bg-primary bg-cover bg-center rounded-lg"
            style={{ backgroundImage: `url(${image})` }}
          ></div>
          <span>
            <h1 className="font-bold text-lg sm:text-lg text-background">
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
            <a
              href={link}
              className="text-blue-500   inline-block hover:shadow-sm px-2 py-1 rounded-md"
            >
              Read More
            </a>
            <div className="flex gap-2">
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
                    }
                  );
                  console.log(await response.json());
                }}
              >
                Delete
              </button>
              <Link
                to={{ pathname: `/admin/user/edit/${id}`, search: `?id=${id}` }}
              >
                {" "}
                <button className="text-primary cursor-pointer hover:shadow-sm px-2 py-1 rounded-md">
                  edit
                </button>
              </Link>
            </div>
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
    // </center>
  );
}

export default MultiBlogCard;

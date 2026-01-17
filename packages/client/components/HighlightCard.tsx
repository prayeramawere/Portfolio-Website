import React from "react";
import type { BlogCardType, Highlights } from "../lib/types";

function HighlightCard({ highlight }: { highlight: Highlights }) {
  let title,
    subtitle,
    description,
    image,
    link,
    category,
    username,
    testimony,
    name,
    role,
    date;
  switch (highlight.type) {
    case "blog":
      ({ title, subtitle, description, image, link, category } =
        highlight.data);
      break;
    case "testimonial":
      ({ username, image, testimony, date, category } = highlight.data);
      break;
    case "publicAdmin":
      ({ name, role, image, category } = highlight.data);
      break;
    case "project":
      ({ name, description, link, image, category } = highlight.data);
  }

  return (
    <div className="w-[300px] h-[300px] rounded-lg bg-background/3 shadow-sm">
      <div className="w-full bg-black h-[80px] rounded-t-lg">
        <span className="text-2xl uppercase font-primary-font p-10 flex justify-center text-center text-white">
          {category}
        </span>
      </div>
      <div>
        <div>
          {highlight.type === "blog" && (
            <center>
              <div className="w-[90%] flex mt-2 self-center">
                <div
                  className="w-[30%] bg-primary bg-cover bg-center"
                  style={{ backgroundImage: `url(${image})` }}
                ></div>
                <div className="w-[70%] p-2 bg-element ">
                  <h1 className="font-bold text-md">{title}</h1>
                  <h2 className="font-semibold text-[10px] mt-2">{subtitle}</h2>
                  <p className="mt-4 text-[6px]">
                    {description?.split("").slice(0, 200)}
                    <a
                      href={link}
                      className="text-blue-500 underline mt-4 inline-block"
                    >
                      Read More
                    </a>
                  </p>
                </div>
              </div>
            </center>
          )}
          {highlight.type === "testimonial" && (
            <div className="w-[250px] h-[200px] bg-element rounded-md p-2 ml-5 mt-2">
              <div className="flex justify-between">
                <span>
                  <img
                    className="w-[50px] h-[50px] rounded-full bg-primary object-cover object-center"
                    src={image}
                    alt=""
                  />{" "}
                  <span className="font-bold">{username}</span>
                </span>
                <span className="font-bold text-black-faint">{date}</span>
              </div>
              <p className=" p-6 text-[10px]">{testimony}</p>
            </div>
          )}
          {highlight.type == "publicAdmin" && (
            <div className="p-10 flex justify-center text-center flex-wrap">
              <img
                className="w-[100px] h-[100px] bg-primary rounded-full object-cover object-center"
                src={image}
                alt=""
              />
              <h1 className="font-bold text-white font-primary-font text-2xl">
                {name}
              </h1>
              <span className="font-semibold text-white text-black-faint">
                {role}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default HighlightCard;

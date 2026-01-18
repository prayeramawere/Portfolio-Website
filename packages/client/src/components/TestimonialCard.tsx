import React from "react";
import { type TestimonialCardType } from "../../lib/types";

function TestimonialCard({
  testimonial,
}: {
  testimonial: TestimonialCardType;
}) {
  const { username, image, testimony, date } = testimonial;

  return (
    <div className="w-[300px] h-[300px] hover:bg-white-faint/10 bg-background/10 rounded-md p-2 shadow-md text-white">
      <div className="flex justify-between ">
        <span>
          <img
            className="w-[50px] h-[50px] rounded-full bg-white object-cover object-center"
            src={image}
            alt=""
          />{" "}
          <span className="font-bold">{username}</span>
        </span>
        <span className="font-bold text-white-faint">{date}</span>
      </div>
      <p className=" p-6">{testimony}</p>
    </div>
  );
}

export default TestimonialCard;

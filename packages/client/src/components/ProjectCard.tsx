import type { project } from "lib/types";
import React from "react";

const ProjectCard = ({ project }: { project: project }) => {
  const { title, _description, benefit1, benefit2, benefit3, link, _image } =
    project;
  return (
    <div className="text-white w-[300px] h-[380px] hover:bg-primary/25 cursor-pointer transition-all duration-200 shadow-primary shadow-sm rounded-lg flex justify-center ">
      <div className="p-3 gap-5 w-[95%] ">
        <h1 className="text-xl font-bold">{title}</h1>
        <p className="p-3 text-sm text-white-faint">{_description}</p>
        <ul className="list-disc mb-0 bottom-0 relative">
          <li>{benefit1}</li>
          <li>{benefit2}</li>
          <li>{benefit3}</li>
        </ul>
        <img
          src={_image}
          alt=""
          className="w-full h-[150px] object-cover object-center mt-2"
        />
      </div>
    </div>
  );
};

export default ProjectCard;

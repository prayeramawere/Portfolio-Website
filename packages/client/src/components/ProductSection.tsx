import React from "react";
import ProjectCard from "./ProjectCard";
import type { project } from "lib/types";

const ProductSection = ({ projects }: { projects: project[] }) => {
  return (
    <section className="w-full p-4 flex justify-center items-center">
      <div className="w-[90%] flex flex-wrap justify-center items-center gap-3">
        {projects.map((project: project, index: number) => (
          <ProjectCard project={project} key={index} />
        ))}
      </div>
    </section>
  );
};

export default ProductSection;

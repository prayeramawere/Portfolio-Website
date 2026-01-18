import React from "react";
import { Link } from "react-router-dom";

function PersonalProjects() {
  return (
    <section className="mt-4  w-full p-2 m-0" id="projects">
      <h1 className="uppercase font-primary-font text-right  text-element">
        Personal projects
      </h1>
      <div className=" p-2 flex items-center justify-center gap-4">
        <Link to={"https://everrsow.com"}>
          <img src="../eversow.png" alt="" className="w-[100px] object-cover" />
        </Link>
      </div>
    </section>
  );
}

export default PersonalProjects;

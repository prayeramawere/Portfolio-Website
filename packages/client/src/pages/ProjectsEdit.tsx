import { API_URL } from "@/assets/api";
import ProjectCard from "@/components/ProjectCard";
import type { project, ProjectRes } from "lib/types";
import React, { useEffect, useState } from "react";

const ProjectsEdit = () => {
  const [projects, setProjects] = useState<ProjectRes | null>(null);

  const getProjects = async () => {
    const response = await fetch(`${API_URL}/api/projects`);
    if (!response.ok) {
      throw new Error(`problem while fetching projects ${response.status}`);
    }
    const projects = await response.json();
    setProjects(projects);
  };

  useEffect(() => {
    getProjects();
  }, []);

  const projects_data = projects?.data as project[];

  return (
    <>
      <div className="text-white">
        {projects_data?.length > 0 ? (
          <div>
            {projects_data?.map((project) => (
              <ProjectCard project={project} key={project.id} />
            ))}
          </div>
        ) : (
          "there are no projects to show"
        )}
      </div>
      ;
    </>
  );
};

export default ProjectsEdit;

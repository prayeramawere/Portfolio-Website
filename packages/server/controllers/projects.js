import express from "express";
import {
  createProjectDB,
  updateProjectDB,
  getProjectsDB,
  getProjectById,
  deleteProjectDB,
} from "../config/db.js";

const getProjects = (req, res) => {
  try {
    const response = getProjectsDB();
    res.status(200).json({ success: true, data: response });
  } catch (error) {
    console.log("an error occured while fetching projects: ", error);
  }
};
const createProject = (req, res) => {
  const { title, description, benefit1, benefit2, benefit3, link, _image } =
    req.body;

  if (
    title &&
    description &&
    benefit1 &&
    benefit2 &&
    benefit3 &&
    link &&
    _image
  ) {
    const projectData = [
      title,
      description,
      benefit1,
      benefit2,
      benefit3,
      link,
      _image,
    ];
    try {
      createProjectDB(projectData);
      const response = getProjectsDB();
      res.status(200).json({ success: true, data: response });
    } catch (error) {
      res.status(400).json({ success: false, msg: error });
    }
  } else {
    res.status(400).json({ success: false, msg: "Dude you forgot something" });
  }
};

const updateProject = (req, res) => {
  const { id } = req.params;
  const { title, description, benefit1, benefit2, benefit3, link, _image } =
    req.body;
  const project = getProjectById(Number(id));

  if (!project) {
    res
      .status(400)
      .json({ success: false, msg: "project not found not found" });
  }

  if (
    title &&
    description &&
    benefit1 &&
    benefit2 &&
    benefit3 &&
    link &&
    _image
  ) {
    const projectData = [
      title,
      description,
      benefit1,
      benefit2,
      benefit3,
      link,
      _image,
    ];
    try {
      updateProjectDB(projectData);
      const projects = getProjectsDB();
      res.status(200).json({ success: true, data: projects });
    } catch (error) {
      res.status(400).json({
        success: false,
        msg: "an error occured updating project",
        error,
      });
    }
  }
};

const deleteProject = (req, res) => {
  const { id } = req.params;
  try {
    const response = deleteProjectDB(Number(id));
    res.status(200).json({ success: true, data: response });
  } catch (error) {
    res.status(200).json({
      success: false,
      msg: `an error occured while deleting project: ${error}`,
    });
  }
};
export { getProjects, createProject, updateProject, deleteProject };

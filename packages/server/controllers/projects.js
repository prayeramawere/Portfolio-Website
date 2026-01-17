const { projects } = require("../data.js");
const express = require("express");

const getProjects = (req, res) => {
  res.status(200).json({ success: true, data: projects });
};
const createProject = (req, res) => {
  const { name, description, link, image } = req.body;

  if (name & description & link & image) {
    try {
      projects.push({
        name,
        description,
        link,
        image,
      });
      res.status(200).json({ success: true, data: projects });
    } catch (error) {
      res.status(400).json({ success: false, msg: error });
    }
  } else {
    res.status(400).json({ success: false, msg: "Dude you forgot something" });
  }
};
const updateProject = (req, res) => {
  const { id } = req.params;
  const { name, description, link, image } = req.body;
  const project = projects.find((project) => project.id == Number(id));

  if (!project) {
    res
      .status(400)
      .json({ success: false, msg: "project not found not found" });
  }

  if (name || description || link || image) {
    const newProjects = projects.map((project) => {
      if (project.id === Number(id)) {
        name ? (project.name = name) : (project.name = project.name);
        description
          ? (project.description = description)
          : (project.description = project.description);
        link ? (project.link = link) : (project.link = project.link);
        image ? (project.image = image) : (project.image = project.image);
      }
      return projects;
    });
    res.status(200).json({ success: true, data: newProjects });
  }
};

const deleteProject = (req, res) => {
  //delete blog
};
module.exports = { getProjects, createProject, updateProject, deleteProject };

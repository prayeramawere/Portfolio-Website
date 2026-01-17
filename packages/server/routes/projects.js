const express = require("express");
const router = express.Router();
const authenticationMiddleware = require("../middleware/auth.js");
const {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
} = require("../controllers/projects.js");

router.get("/", getProjects);
router.post("/", authenticationMiddleware, createProject);
router.put("/:id", authenticationMiddleware, updateProject);
router.delete("/:id", authenticationMiddleware, deleteProject);

module.exports = router;

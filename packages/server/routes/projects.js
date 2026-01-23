import { Router } from "express";
const router = Router();
import authenticationMiddleware from "../middleware/auth.cjs";
import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
} from "../controllers/projects.js";

router.get("/", getProjects);
router.post("/", authenticationMiddleware, createProject);
router.put("/:id", authenticationMiddleware, updateProject);
router.delete("/:id", authenticationMiddleware, deleteProject);

export default router;

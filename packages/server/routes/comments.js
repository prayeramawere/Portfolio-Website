import { Router } from "express";
const router = Router();
import {
  getComments,
  postComments,
  deleteComments,
} from "../controllers/comments.js";
import authenticationMiddleware from "../middleware/auth.cjs";

router.get("/", getComments);

router.post("/", postComments);

router.delete("/:id", authenticationMiddleware, deleteComments);

export default router;

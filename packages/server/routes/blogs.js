import { Router } from "express";
const router = Router();
import pkg from "../middleware/auth.cjs";
const authenticationMiddleware = pkg;

import pkg2 from "../controllers/blogs.js";
const {
  getBlog,
  postBlog,
  updateBlog,
  deleteBlog,
  updateViews,
  getBlogById,
  getBlogViews,
  updateLikes,
} = pkg2;

router.get("/", getBlog);

router.get("/:id", getBlogById);

router.get("/views/:id", getBlogViews);

router.post("/update", updateViews);

router.put("/update_likes", updateLikes);

router.post("/", authenticationMiddleware, postBlog);

router.put("/:id", authenticationMiddleware, updateBlog);

router.delete("/:id", authenticationMiddleware, deleteBlog);
export default router;

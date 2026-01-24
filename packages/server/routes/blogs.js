import { Router } from "express";
const router = Router();
import pkg from "../middleware/auth.cjs";
const authenticationMiddleware = pkg;

import pkg2 from "../controllers/blogs.js";
const { getBlog, postBlog, updateBlog, deleteBlog, updateViews } = pkg2;

router.get("/", getBlog);

router.post("/update", updateViews);

router.post("/", authenticationMiddleware, postBlog);

router.put("/:id", authenticationMiddleware, updateBlog);

router.delete("/:id", authenticationMiddleware, deleteBlog);
export default router;

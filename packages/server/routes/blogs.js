const express = require("express");
const router = express.Router();
const authenticationMiddleware = require("../middleware/auth.js");

const {
  getBlog,
  postBlog,
  updateBlog,
  deleteBlog,
} = require("../controllers/blogs.js");

router.get("/", getBlog);

router.post("/", authenticationMiddleware, postBlog);

router.put("/:id", authenticationMiddleware, updateBlog);

router.delete("/:id", authenticationMiddleware, deleteBlog);
module.exports = router;

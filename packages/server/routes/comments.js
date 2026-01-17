const express = require("express");
const router = express.Router();
const {
  getComments,
  postComments,
  deleteComments,
} = require("../controllers/comments.js");
const authenticationMiddleware = require("../middleware/auth.js");

router.get("/", getComments);

router.post("/", postComments);

router.delete("/:id", authenticationMiddleware, deleteComments);

module.exports = router;

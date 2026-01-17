const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { secretCodes } = require("../data.js");
const authenticationMiddleware = require("../middleware/auth.js");

const {
  createTestimonial,
  deleteTestimonial,
  clientLogin,
  getTestimonials,
} = require("../controllers/testimonials");

router.get("/", getTestimonials);
router.post("/login", clientLogin);
router.post("/post", createTestimonial);
router.delete("/delete/:id", authenticationMiddleware, deleteTestimonial);

module.exports = router;

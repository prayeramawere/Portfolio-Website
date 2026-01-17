const express = require("express");
const {
  getAdmin,
  updateAdmin,
  getPublicAdmin,
} = require("../controllers/admin.js");
const router = express.Router();
const authenticationMiddleware = require("../middleware/auth.js");

router.get("/public", getPublicAdmin);

router.post("/", authenticationMiddleware, getAdmin);

router.post("/update", authenticationMiddleware, updateAdmin);

module.exports = router;

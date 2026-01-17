const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const { admin } = require("../data.js");

router.post("/", (req, res) => {
  try {
    console.log("BODY:", req.body); // 👈 see incoming data

    const { unique_code1, unique_code2 } = req.body;

    if (!unique_code1 || !unique_code2) {
      return res.status(400).json({
        success: false,
        msg: "Please provide valid information",
      });
    }

    if (
      unique_code1 === admin.unique_code1 &&
      unique_code2 === admin.unique_code2
    ) {
      const token = jwt.sign(
        { unique_code1, unique_code2 },
        process.env.SECRET_KEY,
        { expiresIn: "30d" }
      );

      return res.status(200).json({ success: true, token });
    }

    return res.status(401).json({
      success: false,
      msg: "Invalid credentials",
    });
  } catch (err) {
    console.error("LOGIN ROUTE ERROR:", err); // 👈 you NEED this
    return res.status(500).json({
      success: false,
      msg: "Server error",
    });
  }
});

module.exports = router;

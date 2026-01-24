const { Router } = require("express");
const sign = require("jsonwebtoken");

const router = Router();

router.post("/", async (req, res) => {
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
      unique_code1 === process.env.UNIQUE_CODE1 &&
      unique_code2 === process.env.UNIQUE_CODE2
    ) {
      const token = sign(
        { unique_code1, unique_code2 },
        process.env.SECRET_KEY,
        { expiresIn: "30d" },
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

const express = require("express");
const jwt = require("jsonwebtoken");

const authenticationMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log(authHeader);

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    res.status(400).json({ success: false, msg: "token not available" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const { unique_code1, unique_code2 } = jwt.verify(
      token,
      process.env.SECRET_KEY
    );
    console.log(process.env.SECRET_KEY);
    req.user = { unique_code1, unique_code2 };
    next();
  } catch (error) {
    res.send(`Error authenticating user, ${error}`);
  }
};

const testimonialAuthMiddleware = async (req, res, next) => {};

module.exports = authenticationMiddleware;

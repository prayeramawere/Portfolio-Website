const express = require("express");
const router = express.Router();
const { blogs, testimonials, projects, publicAdmin } = require("../data.js");

const getRanodomComponent = (data) => {
  if (data) {
    const max = data.length;
    const random = Math.floor(Math.random() * max);

    const component = data[random];

    return component;
  } else {
    return "No Data Available";
  }
};
let highlights = [];

setInterval(() => {
  highlights = [
    { type: "blog", data: getRanodomComponent(blogs) },
    { type: "testimonial", data: getRanodomComponent(testimonials) },
    // { type: "project", data: getRanodomComponent(projects) },
    { type: "publicAdmin", data: publicAdmin },
  ];
  // console.log("highlights", highlights);
}, 6000);

router.get("/", async (req, res) => {
  console.log("here", highlights);
  res.status(200).json({ success: true, data: highlights });
});

module.exports = router;

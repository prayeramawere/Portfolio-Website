const { blogs } = require("../data.js");
const express = require("express");
const {
  createBlogDB,
  updateBlogDB,
  getBlogsDB,
  getBlogsById,
  deleteBlogDB,
} = require("../config/db.js");

const formartDate = Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

const getBlog = (req, res) => {
  try {
    const response = getBlogsDB();
    res.status(200).json({ success: true, data: blogs });
  } catch (error) {
    console.log("an error occured while fetching blogs:", error);
  }
};
const postBlog = async (req, res) => {
  const { category, title, subtitle, _message, _image, link } = req.body;

  const blogData = [
    formartDate(new Date.getTime()),
    category,
    title,
    subtitle,
    _message,
    _image,
    link,
    0,
    0,
  ];

  if (category && title && subtitle && _message && _image && link) {
    try {
      const response = await createBlogDB(blogData);
      if (response.status == "SUCCESS") {
        res.status(200).json({ success: true, data: response });
      } else {
        res.status(400).json({ success: false, data: response });
      }
    } catch (error) {
      res.status(400).json({ success: false, msg: error });
    }
  } else {
    res.status(400).json({ success: false, msg: "Dude you forgot something" });
  }
};
const updateBlog = async (req, res) => {
  const { id } = req.params;
  const { category, title, subtitle, _message, _image, link } = req.body;
  const blogData = [category, title, subtitle, _message, _image, link];
  const blog = getBlogsById(Number(id));

  if (!blog) {
    return res.status(400).json({ success: false, msg: "blog not found" });
  }

  if (category && title && subtitle && _message && _image && link) {
    try {
      const response = await updateBlogDB(blogData, id);
      if (response.status == "SUCCESS") {
        return res.status(200).json({ success: true, data: Newblogs });
      } else {
        return res.status(400).json({ success: false, msg: response });
      }
    } catch (error) {
      return res.status(400).json({ success: false, msg: error });
    }
  } else {
    res.status(400).json({ success: false, msg: "Dude you forgot something" });
  }
};

const deleteBlog = (req, res) => {
  const { id } = req.params;
  try {
    const response = deleteBlogDB(Number(id));
    res.status(200).json({ success: true, data: response });
  } catch (error) {
    res
      .status(200)
      .json({
        success: false,
        msg: `an error occured while deleting blog: ${error}`,
      });
  }
};
module.exports = { getBlog, postBlog, updateBlog, deleteBlog };

const { blogs } = require("../data.js");
const express = require("express");

const getBlog = (req, res) => {
  res.status(200).json({ success: true, data: blogs });
};
const postBlog = (req, res) => {
  const { title, subtitle, description, image, link } = req.body;

  if (title & subtitle & description & image & link) {
    try {
      blogs.push({
        title,
        subtitle,
        description,
        image,
        link,
      });
      res.status(200).json({ success: true, data: blogs });
    } catch (error) {
      res.status(400).json({ success: false, msg: error });
    }
  } else {
    res.status(400).json({ success: false, msg: "Dude you forgot something" });
  }
};
const updateBlog = (req, res) => {
  const { id } = req.params;
  const { title, subtitle, description, link } = req.body;
  const blog = blogs.find((blog) => blog.id == Number(id));

  if (!blog) {
    res.status(400).json({ success: false, msg: "blog not found" });
  }

  if (title || subtitle || description || image || link) {
    const Newblogs = blogs.map((blog) => {
      if (blog.id === Number(id)) {
        title ? (blog.title = title) : (blog.title = blog.title);
        subtitle ? (blog.subtitle = subtitle) : (blog.subtitle = blog.subtitle);
        description
          ? (blog.description = description)
          : (blog.description = blog.description);
        image ? (blog.image = image) : (blog.image = blog.image);
        link ? (blog.link = link) : (blog.link = blog.link);
      }
      return blogs;
    });
    res.status(200).json({ success: true, data: Newblogs });
  }
};

const deleteBlog = (req, res) => {
  const { id } = req.params;

  res.status(200).json({ success: true, msg: `deleted user with id ${id}` });
};
module.exports = { getBlog, postBlog, updateBlog, deleteBlog };

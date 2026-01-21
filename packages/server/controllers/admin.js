const { get } = require("mongoose");
const { admin, publicAdmin } = require("../data.js");
const { addAdmin, updateAdminDB } = require("../config/db.js");

const getAdmin = (req, res) => {
  res.status(200).json({ success: true, data: admin });
};
const updateAdmin = (req, res) => {
  const { name, role, bio, story, skills, image } = req.body;

  console.log("This stuff here we go", req.body);
  try {
    if (name || role || bio || story || skills || image) {
      name ? (admin.name = name) : (admin.name = admin.name);
      role ? (admin.role = role) : (admin.role = admin.role);
      bio ? (admin.bio = bio) : (admin.bio = admin.bio);
      story ? (admin.story = story) : (admin.story = admin.story);
      skills ? (admin.skills = skills) : (admin.skills = admin.skills);
      image ? (admin.image = image) : (admin.image = admin.image);
    }
    res.status(200).json({ success: true, data: admin });
  } catch (error) {
    res.status(200).json({ success: false, msg: `an error occured ${error}` });
  }
};
const getPublicAdmin = (req, res) => {
  res.status(200).json({ success: true, data: publicAdmin });
};

module.exports = { getAdmin, updateAdmin, getPublicAdmin };

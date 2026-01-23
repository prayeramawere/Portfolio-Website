const { get } = require("mongoose");
const { admin, publicAdmin } = require("../data.js");
const { updateAdminDB } = require("../config/db.js");

const getAdmin = (req, res) => {
  res.status(200).json({ success: true, data: admin });
};
const updateAdmin = (req, res) => {
  const { username, _role, bio, story, _image } = req.body;

  console.log("This stuff here we go", req.body);

  try {
    const response = updateAdminDB({ username, _role, bio, story, _image });
    res.status(200).json({ success: true, data: response });
  } catch (error) {
    res.status(200).json({ success: false, msg: `an error occured ${error}` });
  }
};
const getPublicAdmin = (req, res) => {
  res.status(200).json({ success: true, data: publicAdmin });
};

module.exports = { getAdmin, updateAdmin, getPublicAdmin };

import { getAdminDB, updateAdminDB } from "../config/db.js";

const getAdmin = async (req, res) => {
  try {
    const response = await getAdminDB();
    res.status(200).json({ success: true, data: response });
  } catch (error) {
    console.log("error fetching user", error);
    res.status(400).json({ success: false, mgs: "failed to fetch user data" });
  }
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
const getPublicAdmin = async (req, res) => {
  try {
    const response = await getAdminDB();
    console.log(response[0]);

    const admin = {
      name: response[0].username,
      role: response[0]._role,
      bio: response[0].bio,
      story: response[0].story,
      image: response[0]._image,
    };
    res.status(200).json({ success: true, data: admin });
  } catch (error) {
    console.log("error fetching user", error);
    res.status(400).json({ success: false, mgs: "failed to fetch user data" });
  }
};

export { getAdmin, updateAdmin, getPublicAdmin };

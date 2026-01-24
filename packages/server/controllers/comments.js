import {
  createCommentDB,
  getCommentsDB,
  deleteCommentDB,
} from "../config/db.js";

const formartDate = Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

const getComments = async (req, res) => {
  try {
    const response = await getCommentsDB();
    console.log(response);
    res.status(200).json({ success: true, data: response });
  } catch (error) {
    console.log("an error occured while fetching comments: ", error);
  }
};
const postComments = async (req, res) => {
  const { blogID, comment, author } = req.body;
  const _created_at = formartDate.format(new Date().getTime());
  const likes = 0;

  const commentData = [blogID, _created_at, comment, author, likes];

  console.log(blogID, _created_at, comment, author, likes);
  if (blogID && comment && author) {
    try {
      const response = await createCommentDB(commentData);

      if (response.status == "SUCCESS") {
        const data = getCommentsDB();
        res.status(200).json({ success: true, data: data });
      } else {
        const data = getCommentsDB();
        res.status(200).json({ success: false, data: data });
      }
    } catch (error) {
      res.status(400).json({ success: false, msg: error });
    }
  } else {
    res.status(400).json({ success: false, msg: "missing information" });
  }
};

const deleteComments = (req, res) => {
  const { id } = req.params;
  try {
    const response = deleteCommentDB(Number(id));
    res.status(200).json({ success: true, data: response });
  } catch (error) {
    res.status(200).json({
      success: false,
      msg: `an error occured while deleting comment: ${error}`,
    });
  }
};

export { getComments, postComments, deleteComments };

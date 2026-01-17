const { comments } = require("../data.js");

const formartDate = Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

const getComments = (req, res) => {
  res.status(200).json({ success: true, data: comments });
};
const postComments = (req, res) => {
  const { blogID, comment, author } = req.body;
  const date = formartDate.format(new Date().getTime());
  const likes = 0;
  let id = 0;
  console.log(blogID, date, comment, author, likes);
  if (blogID || date || comment || author || likes) {
    try {
      const userComment = {
        blogID,
        id: ++id,
        date,
        comment,
        author,
        likes,
      };

      comments.push(userComment);
      res.status(200).json({ success: true, data: comments });
    } catch (error) {
      res.status(400).json({ success: false, msg: error });
    }
  } else {
    res.status(400).json({ success: false, msg: "missing information" });
  }
};

const deleteComments = (req, res) => {
  //delete comment
};

module.exports = { getComments, postComments, deleteComments };

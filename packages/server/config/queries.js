const create_admin_query = `INSERT INTO admin (username,_role,bio,story,_image,unique_code1,unique_code2)
  VALUES ($1, $2, $3, $4, $5, $6, $7)`;
const update_admin_query = `UPDATE admin SET username = $1, _role = $2, bio = $3, story = $4, _image = $5, unique_code1 = $6,unique_code2 = $6 WHERE id = 1`;

const create_blog_query = `INSERT INTO blogs ( _created_at,category,title,subtitle,_message,_image,link,likes,views)
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`;
const update_blog_query = `UPDATE blogs SET category = $1,title = $2, subtitle = $3, _message =$4, _image = $5, link = $6 ,likes = $7,views =$8`;

const create_comment_query = `INSERT INTO Comments (BlogID,_created_at,comment,author,likes)
  VALUES ($1, $2, $3, $4, $5)`;
const update_comment_query = `UPDATE Comments SET BlogID = $1,_created_at = $2, comment = $3, author =$4, likes = $5`;

const create_project_query = `INSERT INTO Projects ( title,_description,benefit1,benefit2,benefit3,link,_image)
  VALUES ($1, $2, $3, $4, $5, $6, $7)`;
const update_project_query = `UPDATE Projects SET title = $1,_description = $2, benefit1 = $3, benefit2 =$4, benefit3 = $5,link =$6, _image = $7`;

module.exports = {
  create_admin_query,
  update_admin_query,
  create_blog_query,
  update_blog_query,
  create_comment_query,
  update_comment_query,
  create_project_query,
  update_project_query,
};

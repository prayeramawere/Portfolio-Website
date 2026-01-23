export const create_admin_query = `INSERT INTO Admin (username,_role,bio,story,_image,unique_code1,unique_code2) VALUES ($1, $2, $3, $4, $5, $6, $7)`;
export const update_admin_query = `UPDATE Admin SET username = $1, _role = $2, bio = $3, story = $4, _image = $5, unique_code1 = $6,unique_code2 = $6 WHERE id = 1`;
export const get_admin_query = "SELECT * FROM Admin";

export const create_blog_query = `INSERT INTO Blogs ( _created_at,category,title,subtitle,_message,_image,link,likes,views) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`;
export const update_blog_query = `UPDATE Blogs SET category = $1,title = $2, subtitle = $3, _message =$4, _image = $5, link = $6 ,likes = $7,views =$8 WHERE id = $9`;
export const get_blog_byId = "SELECT * FROM Blogs WHERE id = $1";
export const delete_blog_query = " DELETE FROM Blogs WHERE id = $1";
export const get_blogs_query = "SELECT * FROM Blogs";

export const create_comment_query = `INSERT INTO Comments (BlogID,_created_at,comment,author,likes) VALUES ($1, $2, $3, $4, $5)`;
export const update_comment_query = `UPDATE Comments SET BlogID = $1,_created_at = $2, comment = $3, author =$4, likes = $5 WHERE id = $6`;
export const get_comment_byId = "SELECT * FROM Comments WHERE id = $1";
export const delete_comment_query = " DELETE FROM Comments WHERE id = $1";
export const get_comments_query = "SELECT * FROM Comments";

export const create_project_query = `INSERT INTO Projects ( title,_description,benefit1,benefit2,benefit3,link,_image) VALUES ($1, $2, $3, $4, $5, $6, $7)`;
export const update_project_query = `UPDATE Projects SET title = $1,_description = $2, benefit1 = $3, benefit2 =$4, benefit3 = $5,link =$6, _image = $7 WHERE id = $8`;
export const get_project_byId = "SELECT * FROM Projects WHERE id = $1";
export const delete_project_query = " DELETE FROM Projects WHERE id = $1";
export const get_projects_query = "SELECT * FROM Projects";

//

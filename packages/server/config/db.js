import { Client } from "pg";
import {
  create_admin_query,
  update_admin_query,
  create_blog_query,
  update_blog_query,
  create_comment_query,
  update_comment_query,
  create_project_query,
  update_project_query,
  get_blog_byId,
  get_comment_byId,
  get_project_byId,
  delete_blog_query,
  delete_comment_query,
  delete_project_query,
  get_admin_query,
  get_blogs_query,
  get_comments_query,
  get_projects_query,
  update_blogsV_query,
} from "./queries.js";

const client = new Client({
  host: "localhost",
  user: "postgres",
  database: "portfolioamo",
  password: "Mawere#1234",
});

await client.connect();

const getAdminDB = async () => {
  try {
    const response = await client.query(get_admin_query);
    const adminData = response.rows;
    return adminData;
  } catch (error) {
    console.log("an error occured", error);
  }
};
const addAdmin = async () => {
  const adminData = [
    "Prayer Mawere",
    "Tech Enthusiast",
    "A tech enthusiast and web developer who loves turning ideas into software, diving deep into modern tech, and leveling up through code and gaming alike.",
    "I`m a tech enthuasiast writing about tech and the world around us",
    "https://avatars.githubusercontent.com/u/248066150?v=4",
    "x31,.wk3..s",
    "x31,.wk3..s",
  ];

  let response = client.query(create_admin_query, adminData, (err, result) => {
    err
      ? (response = {
          status: "Error",
          mgs: err,
        })
      : (response = {
          status: "SUCCESS",
          msg: "user created successfully",
        });
  });
  console.log(response);
};

const updateAdminDB = async (adminData) => {
  let response = {};
  client.query(update_admin_query, adminData, (err, result) => {
    err
      ? (response = {
          status: "ERROR",
          msg: err,
        })
      : (response = {
          status: "SUCCESS",
          msg: "updated admin successfuly",
        });
  });
  return response;
};

const getBlogsDB = async () => {
  try {
    const response = await client.query(get_blogs_query);
    const blogData = response.rows;
    return blogData;
  } catch (error) {
    console.log("an error occured", error);
  }
};
const createBlogDB = async (blogData) => {
  let response = {};

  client.query(create_blog_query, blogData, (err, result) => {
    err
      ? (response = {
          status: "Error",
          mgs: err,
        })
      : (response = {
          status: "SUCCESS",
          msg: "blog created successfully",
        });
  });
  console.log(response);
};

const updateBlogDB = async (blogData) => {
  let response = {};
  client.query(update_blog_query, blogData, (err, result) => {
    err
      ? (response = {
          status: "ERROR",
          msg: err,
        })
      : (response = {
          status: "SUCCESS",
          msg: "updated blog successfuly",
        });
  });
  return response;
};
const getBlogsById = async (id) => {
  const response = await client.query(get_blog_byId, [id]);
  return response.rows;
};

const updateViewsDB = async (views, id) => {
  let response = client.query(
    update_blogsV_query,
    [views, id],
    (err, result) => {
      err
        ? (response = {
            status: "ERROR",
            msg: err,
          })
        : (response = {
            status: "SUCCESS",
            msg: "updated views successfuly",
          });
    },
  );
  return response;
};

const deleteBlogDB = async (id) => {
  let response = {};
  client.query(delete_blog_query, [id], (err, result) => {
    err
      ? (response = {
          status: "ERROR",
          msg: err,
        })
      : (response = {
          status: "SUCCESS",
          msg: "deleted blog successfuly",
        });
  });
  return response;
};

// comments
const getCommentsDB = async () => {
  try {
    const response = await client.query(get_comments_query);
    const commentData = response.rows;
    return commentData;
  } catch (error) {
    console.log("an error occured", error);
  }
};
console.log("comments are", getCommentsDB);
const createCommentDB = async (commentData) => {
  let response = {};

  client.query(create_comment_query, commentData, (err, result) => {
    err
      ? (response = {
          status: "Error",
          mgs: err,
        })
      : (response = {
          status: "SUCCESS",
          msg: "comment created successfully",
        });
  });
  console.log(response);
};

const updateCommentDB = async (commentData) => {
  let response = {};
  client.query(update_comment_query, commentData, (err, result) => {
    err
      ? (response = {
          status: "ERROR",
          msg: err,
        })
      : (response = {
          status: "SUCCESS",
          msg: "updated comment successfuly",
        });
  });
  return response;
};
const getCommentsById = async (id) => {
  const response = await client.query(get_comment_byId, [id]);
  return response.rows;
};

const deleteCommentDB = async (id) => {
  let response = {};
  client.query(delete_comment_query, [id], (err, result) => {
    err
      ? (response = {
          status: "ERROR",
          msg: err,
        })
      : (response = {
          status: "SUCCESS",
          msg: "deleted comment successfuly",
        });
  });
  return response;
};

//Projects
const getProjectsDB = async () => {
  try {
    const response = await client.query(get_projects_query);
    const projectData = response.rows;
    return projectData;
  } catch (error) {
    console.log("an error occured", error);
  }
};
const createProjectDB = async (projectData) => {
  let response = {};

  client.query(create_project_query, projectData, (err, result) => {
    err
      ? (response = {
          status: "Error",
          mgs: err,
        })
      : (response = {
          status: "SUCCESS",
          msg: "project created successfully",
        });
  });
  console.log(response);
};

const updateProjectDB = async (projectData) => {
  let response = {};
  client.query(update_project_query, projectData, (err, result) => {
    err
      ? (response = {
          status: "ERROR",
          msg: err,
        })
      : (response = {
          status: "SUCCESS",
          msg: "updated project successfuly",
        });
  });
  return response;
};
const getProjectById = async (id) => {
  const response = await client.query(get_project_byId, [id]);
  return response.rows;
};

const deleteProjectDB = async (id) => {
  let response = {};
  client.query(delete_project_query, [id], (err, result) => {
    err
      ? (response = {
          status: "ERROR",
          msg: err,
        })
      : (response = {
          status: "SUCCESS",
          msg: "deleted project successfuly",
        });
  });
  return response;
};

export {
  getAdminDB,
  getCommentsDB,
  getBlogsDB,
  getProjectsDB,
  addAdmin,
  updateAdminDB,
  createBlogDB,
  updateBlogDB,
  getBlogsById,
  createCommentDB,
  updateCommentDB,
  getCommentsById,
  createProjectDB,
  updateProjectDB,
  getProjectById,
  deleteProjectDB,
  deleteCommentDB,
  deleteBlogDB,
  updateViewsDB,
};

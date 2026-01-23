const { Client } = require("pg");
const {
  create_admin_query,
  update_admin_query,
  create_blog_query,
  update_blog_query,
  create_comment_query,
  update_comment_query,
  create_project_query,
  update_project_query,
  get_project_byId,
  get_blog_byId,
  get_comment_byId,
  delete_blog_query,
  delete_comment_query,
  delete_project_query,
  get_admin_query,
  get_comments_query,
  get_blogs_query,
  get_projects_query,
} = require("./queries.js");

const client = new Client({
  host: "localhost",
  user: "postgres",
  database: "portfolioamo",
  password: "your_pass#1234",
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
  const adminData = ["Prayer Mawere", "Tech Enthusiast", ""];

  let response = {};

  client.query(create_admin_query, adminData, (err, result) => {
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
    const adminData = response.rows;
    return adminData;
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
    const adminData = response.rows;
    return adminData;
  } catch (error) {
    console.log("an error occured", error);
  }
};
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
    const adminData = response.rows;
    return adminData;
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

module.exports = {
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
};

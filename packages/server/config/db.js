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
} = require("./queries.js");

const client = new Client({
  host: "localhost",
  user: "postgres",
  database: "portfolioamo",
  password: "your_pass#1234",
});

await client.connect();

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

module.exports = {
  addAdmin,
  updateAdminDB,
  createBlogDB,
  updateBlogDB,
  createCommentDB,
  updateCommentDB,
  createProjectDB,
  updateProjectDB,
};

import express from "express";
import blogs from "./routes/blogs.js";
import comments from "./routes/comments.js";
import login from "./routes/auth.cjs";
import admin from "./routes/admin.js";
import projects from "./routes/projects.js";
import dotenv from "dotenv";

import cors from "cors";
const app = express();
dotenv.config();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("./public"));

app.use("/api/secure/12ew/admin", admin);
app.use("/api/secure/12ew/admin/login", login);
app.use("/api/comment", comments);
app.use("/api/blog", blogs);
app.use("/api/projects", projects);

app.listen(5000, "0.0.0.0", () => {
  console.log("Server running on:");
  console.log("Local:   http://localhost:5000");
  console.log("Network: http://" + getLocalIP() + ":5000");
});

import os from "os";
// Helper to print your LAN IP
function getLocalIP() {
  const interfaces = os.networkInterfaces();

  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === "IPv4" && !iface.internal) {
        return iface.address;
      }
    }
  }
}

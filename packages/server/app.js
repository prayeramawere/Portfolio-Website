const express = require("express");
const app = express();
const blogs = require("./routes/blogs.js");
const comments = require("./routes/comments.js");
const login = require("./routes/auth.js");
const admin = require("./routes/admin.js");
const testimonial = require("./routes/testimonials.js");
const cors = require("cors");
let highlights = require("./routes/highlights.js");
const projects = require("./routes/projects.js");
require("dotenv").config();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("./public"));

app.use("/secure/12ew/admin", admin);
app.use("/secure/12ew/admin/login", login);
app.use("/comment", comments);
app.use("/blog", blogs);
app.use("/testimonial", testimonial);
app.use("/projects", projects);
app.use("/highlights", highlights);

app.listen(5000, "0.0.0.0", () => {
  console.log("Server running on:");
  console.log("Local:   http://localhost:5000");
  console.log("Network: http://" + getLocalIP() + ":5000");
});

// Helper to print your LAN IP
function getLocalIP() {
  const os = require("os");
  const interfaces = os.networkInterfaces();

  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === "IPv4" && !iface.internal) {
        return iface.address;
      }
    }
  }
}

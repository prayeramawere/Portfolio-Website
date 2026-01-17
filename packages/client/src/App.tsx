import Home from "./pages/Home";
import Admin from "./pages/Admin";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BlogsEdit from "./pages/BlogsEdit";
import AdminEdit from "./pages/AdminEdit";
import BlogEdit from "./pages/BlogEdit";
import Blogs from "./pages/Blogs";
import Blog from "./pages/Blog";
import FeedBack from "./pages/FeedBack";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/blogs/edit" element={<BlogsEdit />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/admin/user/edit" element={<AdminEdit />} />
        <Route path="/admin/user/edit/:id" element={<BlogEdit />} />
        <Route path="/blog/:id" element={<Blog />}></Route>
        <Route path="/feedback/new/:token" element={<FeedBack />}></Route>
      </Routes>
    </Router>
  );
}

export default App;

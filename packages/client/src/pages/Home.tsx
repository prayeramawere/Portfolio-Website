import type {
  AdminRes,
  BlogRes,
  comment,
  CommentsRes,
  Highlights,
  TestimonialRes,
} from "../../lib/types";

import { useEffect, useState } from "react";
//
import BaseNav from "../components/BaseNav";
import Hero from "../components/Hero";

import About from "@/components/About";
import BlogSection from "@/components/BlogSection";
import PersonalProjects from "@/components/PersonalProjects";
import FloatingNav from "@/components/FloatingNav";
import Footer from "@/components/Footer";

function Home() {
  const [admin, setAdmin] = useState<AdminRes | null>();
  const [projects, setProjects] = useState(null);
  const [comments, setComments] = useState<CommentsRes | null>(null);
  const [blogs, setBlogs] = useState<BlogRes | null>(null);
  // const [testimonials, setTestimonials] = useState<TestimonialRes>();

  type Links = {
    link1: string;
    link2: string;
    link3: string;
    link4: string;
  };
  const currentYear = new Date().getFullYear();

  const loadData = async (Links: Links) => {
    const { link1, link2, link3, link4 } = Links;
    const [adminRes, projectsRes, commentsRes, blogsRes] = await Promise.all([
      fetch(link1),
      fetch(link2),
      fetch(link3),
      fetch(link4),
    ]);

    const [admin, projects, comments, blogs] = await Promise.all([
      adminRes.json(),
      projectsRes.json(),
      commentsRes.json(),
      blogsRes.json(),
    ]);
    console.log(admin, projects, comments, blogs);

    setAdmin(admin as AdminRes);
    setProjects(projects);
    setComments(comments);
    setBlogs(blogs as BlogRes);
  };

  useEffect(() => {
    const links = {
      link1: "http://localhost:5000/secure/12ew/admin/public",
      link2: "http://localhost:5000/projects",
      link3: "http://localhost:5000/comment",
      link4: "http://localhost:5000/blog",
      // link6: "http://localhost:5000/testimonial",
    };
    loadData(links);
  }, []);

  if (!admin || !blogs || !comments) {
    return <div className="text-white text-3xl">Loading...</div>;
  }

  if (!admin?.success) {
    console.log(admin?.msg);
  }

  const { name, role, bio, story, image } = admin.data;
  const commentsData = comments.data as comment[];

  const blogData = blogs.data;

  const social = [
    {
      link: "#",
      url: "instagram",
    },
    {
      link: "#",
      url: "facebook",
    },
    {
      link: "#",
      url: "upwork",
    },
    {
      link: "#",
      url: "github",
    },
    {
      link: "#",
      url: "youtube",
    },
    {
      link: "#",
      url: "linkedin",
    },
  ];

  return (
    <>
      <div className="scroll-smooth">
        <BaseNav />
        <Hero data={[social, name || "", role || "not there", bio || ""]} />
        <About bio={bio || ""} />
        <center>
          <hr className="w-[60%] text-primary" />
        </center>
        <BlogSection blogData={blogData} comments={commentsData || []} />
        <PersonalProjects />
        <Footer currentYear={currentYear} />
        <FloatingNav />
      </div>
    </>
  );
}

export default Home;

import type {
  AdminRes,
  BlogRes,
  comment,
  CommentsRes,
  Highlights,
  project,
  ProjectRes,
  TestimonialRes,
} from "../../lib/types";

import { useEffect, useState } from "react";
//
import BaseNav from "../components/BaseNav";
import Hero from "../components/Hero";

import About from "@/components/About";
import BlogSection from "@/components/BlogSection";
import ProductSection from "@/components/ProductSection";
import PersonalProjects from "@/components/PersonalProjects";
import FloatingNav from "@/components/FloatingNav";
import Footer from "@/components/Footer";

function Home() {
  const [admin, setAdmin] = useState<AdminRes | null>();
  const [projects, setProjects] = useState<ProjectRes | null>(null);
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
    setProjects(projects as ProjectRes);
    setComments(comments);
    setBlogs(blogs as BlogRes);
  };

  useEffect(() => {
    const links = {
      link1: "/api/secure/12ew/admin/public",
      link2: "/api/projects",
      link3: "/api/comment",
      link4: "/api/blog",
      // link6: "/api/testimonial",
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
  const projectsData = projects?.data as project[];

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
        <ProductSection projects={projectsData || []} />
        <PersonalProjects />
        <Footer currentYear={currentYear} />
        <FloatingNav />
      </div>
    </>
  );
}

export default Home;

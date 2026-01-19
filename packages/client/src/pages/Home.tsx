import type {
  AdminRes,
  BlogRes,
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
  const [highlights, setHighlights] = useState<Highlights[] | null>(null);
  const [admin, setAdmin] = useState<AdminRes | null>();
  const [projects, setProjects] = useState(null);
  const [comments, setComments] = useState(null);
  const [blogs, setBlogs] = useState<BlogRes | null>(null);
  const [testimonials, setTestimonials] = useState<TestimonialRes>();

  type Links = {
    link1: string;
    link2: string;
    link3: string;
    link4: string;
    link5: string;
    link6: string;
  };
  const currentYear = new Date().getFullYear();

  const loadData = async (Links: Links) => {
    const { link1, link2, link3, link4, link5, link6 } = Links;
    const [
      highlightsRes,
      adminRes,
      projectsRes,
      commentsRes,
      blogsRes,
      testimonialsRes,
    ] = await Promise.all([
      fetch(link1),
      fetch(link2),
      fetch(link3),
      fetch(link4),
      fetch(link5),
      fetch(link6),
    ]);

    const [highlights, admin, projects, comments, blogs, testimonials] =
      await Promise.all([
        highlightsRes.json(),
        adminRes.json(),
        projectsRes.json(),
        commentsRes.json(),
        blogsRes.json(),
        testimonialsRes.json(),
      ]);
    console.log(highlights, admin, projects, comments, blogs, testimonials);

    setAdmin(admin as AdminRes);
    setHighlights(highlights.data as Highlights[]);
    setProjects(projects);
    setComments(comments);
    setBlogs(blogs as BlogRes);
    setTestimonials(testimonials as TestimonialRes);
  };

  useEffect(() => {
    const links = {
      link1: "http://localhost:5000/highlights",
      link2: "http://localhost:5000/secure/12ew/admin/public",
      link3: "http://localhost:5000/projects",
      link4: "http://localhost:5000/comment",
      link5: "http://localhost:5000/blog",
      link6: "http://localhost:5000/testimonial",
    };
    loadData(links);
  }, []);

  if (!admin || !testimonials || !blogs) {
    return <div>Loading...</div>;
  }

  if (!admin?.success) {
    console.log(admin?.msg);
  }
  const { name, role, bio, story, skills = [], image } = admin.data;

  const testimonialData = testimonials.data;
  const blogData = blogs.data;
  // const highlightData = highlights.data;
  // console.log("Highlights Data:", highlightData);
  console.log("Testimonials Data:", testimonialData);

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
        <Hero data={[social, name || "", role || "", bio || ""]} />
        <About bio={bio || ""} />
        <center>
          <hr className="w-[60%] text-primary" />
        </center>
        <BlogSection blogData={blogData} />
        <PersonalProjects />
        <Footer currentYear={currentYear} />
        <FloatingNav />
      </div>
    </>
  );
}

export default Home;

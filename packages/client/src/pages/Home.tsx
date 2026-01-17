import { Link as Links } from "react-router-dom";
import type {
  AdminRes,
  BlogCardType,
  BlogRes,
  Highlights,
  TestimonialRes,
} from "../../lib/types";

import { useEffect, useState } from "react";
import Skill from "../../components/Skill";

import BlogCard from "../../components/BlogCard";
import { type TestimonialCardType } from "../../lib/types";
import TestimonialCard from "../../components/TestimonialCard";
import { Link } from "react-router-dom";

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
      <div className="  bg-center mt-0 bg-cover">
        <div
          className="  bg-center mt-0 bg-cover"
          style={{
            backgroundImage: `url(https://t4.ftcdn.net/jpg/03/07/07/33/240_F_307073324_GDaWWzce70NwV5e7gEnEJzA3oYtcUNna.jpg)`,
          }}
        >
          <section className="w-full gap-3 flex flex-wrap justify-center md:block md:justify-start">
            <div className="outer-circle w-65 h-65 md:w-[420px] md:h-[420px] bg-background rounded-full mt-10 ml-20 md:mt-20 md:ml-40">
              <div
                className="inner-circle border-l-2 border-primary  w-60 h-60 md:w-[350px] md:h-[350px] bg-white/10 rounded-full mt-[-25px] ml-[-65px] bg-cover bg-center"
                style={{ backgroundImage: `url(${image})` }}
              >
                <div className="headinfo hidden md:block mt-100 md:mt-[60px] absolute font-arial md:ml-[30%]">
                  {" "}
                  <h1 className="text-8xl text-white justify-center font-primary-font items-center flex font-bold  ">
                    {name}
                  </h1>
                  <h2 className="justify-center text-secondary items-center flex font-bold text-2xl">
                    {role}
                  </h2>
                </div>
              </div>
            </div>
            <div className="headinfo  md:hidden  md:mt-[60px] relative font-arial md:ml-[30%] ">
              {" "}
              <h1 className="text-6xl text-white justify-center text-center font-primary-font items-center flex font-bold  ">
                {name}
              </h1>
              <h2 className="justify-center text-secondary items-center flex font-bold text-xl">
                {role}
              </h2>
            </div>
            <div className=" hidden md:block md:flex absolute text-right justify-end ml-[70%] gap-3 mt-5">
              {social.map((icon) => (
                <a key={icon.url} href={icon.link}>
                  <img src={`../${icon.url}.png`} className=" social gap-3" />
                </a>
              ))}
            </div>
          </section>
        </div>
        <div className="bg-background">
          <section
            className="mt-0 md:mt-20 flex flex-wrap md:flex-nowrap"
            id="about"
          >
            <div className="skills p-5 w-full md:w-1/3  md:p-20 text-center space-y-3">
              {skills.map((skill: any) => (
                <Skill skill={skill} />
              ))}
            </div>

            <div className=" md:w-[70%] w-full p-2 md:p-25">
              <p className="text-element">{bio}</p>
              <br />
              {/* <h2 className="font-primary-font text-element">Story</h2> */}
              {/* <p className="text-element">{story}</p> */}
            </div>
          </section>
          <center>
            <hr className="w-[60%] text-primary" />
          </center>
          {blogData.length > 0 && (
            <section className="mt-10">
              <h1 className="uppercase font-primary-font text-right mr-4 text-element">
                Blogs & Articles
              </h1>
              <div className="flex  justify-center flex-wrap">
                {blogData.map((blog: BlogCardType) => (
                  <BlogCard blogs={blog} />
                ))}
              </div>
            </section>
          )}

          {testimonialData.length > 0 && (
            <section className="mt-4 w-full m-0">
              <h1 className="uppercase font-primary-font text-right  text-element">
                Testimonials
              </h1>
              <div className="p-10  flex flex-wrap  gap-3 justify-center ">
                {testimonialData.map((testimonialData: TestimonialCardType) => (
                  <TestimonialCard testimonial={testimonialData} />
                ))}
              </div>
            </section>
          )}

          <section className="mt-4  w-full p-2 m-0" id="projects">
            <h1 className="uppercase font-primary-font text-right  text-element">
              Personal projects
            </h1>
            <div className=" p-2 flex items-center justify-center gap-4">
              <Link to={"https://everrsow.com"}>
                <img
                  src="../eversow.png"
                  alt=""
                  className="w-[100px] object-cover"
                />
              </Link>
            </div>
          </section>

          <section className="mt-4 ">
            {/* <h1
              className="uppercase font-primary-font text-right  text-element"
              id="contact"
            >
              Social & Contact
            </h1> */}
            <div className=" flex  justify-center gap-3 mt-5">
              {social.map((icon) => (
                <a key={icon.url} href={icon.link}>
                  <img
                    src={`../${icon.url}.png`}
                    className=" size-[60px] rounded-full bg-element hover:scale-110 transition-all duration-300 p-2 gap-3"
                  />
                </a>
              ))}
            </div>
          </section>
          <footer className="text-center text-sm text-gray-500 py-6">
            © {currentYear} Prayer Mawere. All rights reserved.
          </footer>
        </div>

        <div className="w-full flex justify-center">
          <div className="navbar bottom-5 text-center text-element flex justify-center items-center mt-10 mb-3">
            <ul className="list-none flex gap-4">
              <Links to="/">
                <li className="link">home</li>
              </Links>
              <Links to={{ hash: "about" }}>
                <li className="link">about</li>
              </Links>
              <Links to="/blogs">
                <li className="link">blogs</li>
              </Links>
              <Links to={{ hash: "contact" }}>
                <li className="link">contact</li>
              </Links>
              <Links
                to={{ pathname: "http://localhost:5173", hash: "projects" }}
              >
                <li className="link">projects</li>
              </Links>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;

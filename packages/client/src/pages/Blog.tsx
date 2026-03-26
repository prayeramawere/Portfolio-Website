import { Link, redirect, useParams } from "react-router-dom";
import { useActionState, useEffect, useState, type FormEvent } from "react";
import type { blog, comment } from "lib/types";
import CommentCard from "../components/CommentCard";
import { useNavigate } from "react-router-dom";
import markdownit from "markdown-it";
import BaseNav from "@/components/BaseNav";
import FloatingNav from "@/components/FloatingNav";
import Footer from "@/components/Footer";
import { Heart } from "lucide-react";
import { API_URL } from "@/assets/api";

const md = markdownit();

function Blog() {
  const navigate = useNavigate();
  const [blog, setBlog] = useState<blog>();
  const [comments, setComments] = useState<comment[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [views, setViews] = useState(0);
  const { id } = useParams();

  const addLike = async () => {
    await fetch(`${API_URL}/api/blog/update_likes`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        likes: blog?.likes,
        id: Number(id),
      }),
    });
  };

  const handleFormSubmit = async (prev: string, formData: FormData) => {
    console.log("invoked");

    const formValues = {
      blogID: formData.get("blogID") as string,
      comment: formData.get("comment") as string,
      author: formData.get("author") as string,
    };

    try {
      const res = await fetch(`${API_URL}/api/comment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
      });

      console.log(res);

      navigate(`/blog/${id}`);
      return "success adding comment";
    } catch (error) {
      return `an error occured ${error}`;
    }
  };

  const [state, action, loading] = useActionState(handleFormSubmit, "test");

  const getBlog = async () => {
    const response = await fetch(`/api/blog/${id}`);
    if (!response.ok) {
      console.log(
        `error occured wie trying to get response: ${response.statusText}`,
      );
    }

    const data = await response.json();
    setBlog(await data.data);
  };
  const getComments = async () => {
    const response = await fetch(`${API_URL}/api/comment`);
    if (!response.ok) {
      console.log(
        `error occured wie trying to get response: ${response.statusText}`,
      );
    }

    const data = await response.json();
    console.log(data);
    setComments(await data.data);
  };

  const getViews = async () => {
    const response = await fetch(`/api/blog/views/${id}`);

    if (!response.ok) {
      console.log(
        `error occurred while trying to get response: ${response.statusText}`,
      );
      return;
    }

    const data = await response.json();
    const newViews = Number(data.data.views);

    console.log("views for id ->", id, "is", newViews);

    setViews(newViews);

    await fetch(`${API_URL}/api/blog/update`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        views: newViews,
        id: Number(id),
      }),
    });
  };

  useEffect(() => {
    getBlog();
    getViews();
    const interval = setInterval(getComments, 2000);
    return () => clearInterval(interval);
  }, [id]);

  const currentBlogComments = comments.filter(
    (comment: comment) => comment.blogid == Number(id),
  );

  // const updateViews = async () => {
  // try {
  const parsedContent = md.render(blog?._message || "");

  //     console.log(res);

  //     navigate(`/blog/${id}`);
  //     return "success adding comment";
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <>
      <BaseNav />
      <div className="flex justify-center items-center w-full flex-wrap">
        <div className="w-full flex-1 r overflow-y-scroll no-scrollbar flex flex-wrap text-white">
          {/* <div className=" sm:w-[10%] flex flex-wrap sm:justify-center w-full">
            <div className="mt-5 flex justify-between w-full m-2 sm:flex-wrap">
              <Link to={"/"}>
                <div className="sm:flex sm:flex-wrap justify-center ">
                  <img
                    src="https://anesumawere-portfolio.space/me.png"
                    alt=""
                    className="w-[80px] h-[80px] rounded-full object-cover"
                  />
                </div>
              </Link>
              <Link to={"/blogs"}>
                <div className="hover:shadow-sm px-3 py-2 rounded-sm sm:hidden">
                  All Blogs
                </div>
              </Link>
            </div>
          </div> */}
          <div className=" sm:w-[80%] p-4 w-full bg-white flex justify-center">
            <div>
              <div className="w-full h-[50px] flex justify-between items-center">
                <div
                  className="w-[50px] h-[50px] bg-black/20 rounded-full"
                  style={{ backgroundImage: `url(../../self.png)` }}
                ></div>
                <div
                  onClick={() => addLike()}
                  className="flex gap-2 px-2 py-1 justify-center rounded-lg shadow-primary hover:shadow-sm"
                >
                  <Heart className="text-pink-500  " />
                  <span className="text-gray-500">{blog?.likes}</span>
                </div>
              </div>
              <div className="mt-3">
                <h1 className="text-3xl text-black font-bold">{blog?.title}</h1>
                <h2 className="text-lg text-white-faint font-bold">
                  {blog?.subtitle}
                </h2>
                <center>
                  <hr className="mt-4 text-black-faint w-[70%] self-center" />
                </center>
                <div className="mt-5 gap-3">
                  <span className="flex justify-center">
                    <img
                      src={blog?._image}
                      alt=""
                      className="w-[80%] h-[300px] object-cover"
                    />
                  </span>
                  {parsedContent ? (
                    <article
                      className="prose lg:prose-xl text-sm"
                      dangerouslySetInnerHTML={{ __html: parsedContent }}
                    />
                  ) : (
                    <p>no data found</p>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className=" sm:w-[10%] p-5 w-full">
            <div>
              <h2>
                Comments{" "}
                <span className="font-bold">{currentBlogComments.length}</span>
              </h2>
            </div>

            <div className="w-[350px] rounded-md mt-5 min-h-[90vh] shadow-md p-3 ">
              <div>
                <button
                  className="text-white px-4 py-3 bg-black rounded-3xl text-sm"
                  onClick={() => setOpen((prev) => !prev)}
                >
                  Add comment
                </button>

                {open && (
                  <form action={action} method="POST">
                    <div className="px-3 py-2 w-[300px] shadow-sm rounded-md text-white">
                      <input
                        type="number"
                        defaultValue={id}
                        name="blogID"
                        className="hidden"
                      />
                      <input
                        type="text"
                        name="author"
                        placeholder="Name"
                        className=" outline-none px-3 py-2 border-l-primary border-l "
                      />
                      <span className="flex">
                        <input
                          type="textarea"
                          placeholder="comment"
                          name="comment"
                          className=" outline-none px-3 py-2 border-l-primary border-l "
                        />
                        <button
                          type="submit"
                          className="text-white px-3 py-2 bg-primary rounded-3xl text-sm"
                        >
                          {loading ? "posting..." : "post"}
                        </button>
                      </span>
                    </div>
                  </form>
                )}
              </div>

              <div>
                {currentBlogComments.map((comment: comment) => (
                  <CommentCard commentData={comment} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-center">
        <FloatingNav />
      </div>
      <Footer currentYear={new Date().getFullYear()} />
    </>
  );
}

export default Blog;

import { useSearchParams } from "react-router-dom";
import { useActionState, useEffect, useState } from "react";

type blog = {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  link: string;
  category: string;
};

function BlogEdit() {
  const [searchParams] = useSearchParams();
  const [blogs, setBlogs] = useState<blog[]>([]);
  const id = searchParams.get("id");

  const getBlogs = async () => {
    const response = await fetch("http://localhost:5000/blog");
    if (!response.ok) {
      console.log(
        `error occured wie trying to get response: ${response.statusText}`
      );
    }

    const data = await response.json();
    console.log(data);
    setBlogs(await data.data);
  };

  const token = localStorage.getItem("token");

  const FormHandler = async (prev: any, formData: FormData) => {
    try {
      const formValues = {
        title: formData.get("title") as string,
        subtitle: formData.get("subtitle") as string,
        description: formData.get("description") as string,
        link: formData.get("link") as string,
      };

      const response = await fetch(`https://localhost:5000/blog/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
      });
      if (!response.ok) {
        console.log(
          `error while attempting to get response: ${response.status}}`
        );
      }
    } catch (error) {
      return {
        success: false,
        error: `an error occured while updating the blog post: ${error}`,
      };
    }
  };

  const [state, formAction, loading] = useActionState(FormHandler, {
    success: false,
    error: "",
  });

  useEffect(() => {
    getBlogs();
  }, []);

  const blog = blogs.find((blog: blog) => blog.id == Number(id));

  return (
    <>
      <div className="flex justify-center items-center">
        {" "}
        <div className="bg-background w-[98%] rounded-md h-[96vh] mt-3 flex justify-center items-center overflow-y-scroll no-scrollbar">
          <form
            action={formAction}
            className=" flex justify-center items-center"
          >
            <div className=" sm:w-[60%] p-4 w-full">
              <div className="mt-3">
                <h1>
                  <textarea
                    name="title"
                    defaultValue={blog?.title}
                    className="text-3xl text-white font-bold w-full mt-5 w-full"
                    id=""
                  ></textarea>
                </h1>
                <h2>
                  <textarea
                    name="subtitle"
                    defaultValue={blog?.subtitle}
                    id=""
                    className="text-lg text-white-faint font-bold w-full"
                  ></textarea>
                </h2>

                <center>
                  <hr className="mt-4 text-white-faint w-[70%] self-center" />
                </center>
                <span>
                  <textarea className="mt-5 text-white">
                    {blog?.description}
                  </textarea>
                </span>
              </div>
              <button
                type="submit"
                className="px-3 py-2 text-white bg-primary "
              >
                {loading ? "Submiting" : "Submit"}
              </button>
            </div>
          </form>
        </div>{" "}
      </div>
    </>
  );
}

export default BlogEdit;

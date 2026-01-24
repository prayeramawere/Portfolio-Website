import React, { useActionState } from "react";
import MDEditor from "@uiw/react-md-editor";

const BlogForm = ({ id, token }: { id: Number | null; token: string }) => {
  const [_message, setValue] = React.useState("**Hello world!!!**");
  const FormHandler = async (prev: any, formData: FormData) => {
    try {
      const formValues = {
        category: formData.get("category") as string,
        title: formData.get("title") as string,
        subtitle: formData.get("subtitle") as string,
        _message,
        _image: formData.get("_image") as string,
        link: formData.get("link") as string,
      };

      if (id) {
        const response = await fetch(`http://localhost:5000/blog/${id}`, {
          method: "Put",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formValues),
        });
        if (!response.ok) {
          console.log(
            `error while attempting to get response: ${response.status}}`,
          );
        }
      } else {
        const response = await fetch(`http://localhost:5000/blog/`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formValues),
        });
        if (!response.ok) {
          console.log(
            `error while attempting to get response: ${response.json()}}`,
          );
        }
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
  return (
    <form action={formAction} className="w-full">
      <input
        type="text"
        name="category"
        placeholder="category"
        className="input"
      />
      <input type="text" name="title" placeholder="title" className="input" />
      <input
        type="text"
        name="subtitle"
        placeholder="subtitle"
        className="input"
      />

      <input
        type="text"
        name="_image"
        className="input"
        required
        placeholder="image enter url"
      />
      <input type="text" name="link" className="input" placeholder="link" />
      <div className="container">
        <MDEditor
          value={_message}
          onChange={(value) => setValue(value as string)}
          id="_message"
          preview="edit"
          className="w-[80%] m-2 bg-primary rounded-lg"
          previewOptions={{
            disallowedElements: ["style"],
          }}
        />
        <MDEditor.Markdown source={_message} />
      </div>
      <div className="w-[80%] mt-3 flex justify-center">
        <button
          className="bg-primary px-4 py-2 rounded-md text-white w-[300px]"
          type="submit"
        >
          {loading ? "creating" : "create"}
        </button>
      </div>
    </form>
  );
};

export default BlogForm;

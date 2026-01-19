import React from "react";

function BlogCategory({ category }: { category: string }) {
  return (
    <p className="bg-primary/15 px-4 py-2 w-fit m-2 text-white rounded-lg">
      {category}
    </p>
  );
}

export default BlogCategory;

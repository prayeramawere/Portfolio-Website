import React from "react";

const Views = async ({ views, id }: { views: number; id: number }) => {
  fetch("http://localhost:5000/blog/update", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      views: Number(views),
      id: Number(id),
    }),
  });

  return <div>Views</div>;
};

export default Views;

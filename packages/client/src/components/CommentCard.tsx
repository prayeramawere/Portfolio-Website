import React from "react";
import type { comment } from "../../lib/types";

function CommentCard({ commentData }: { commentData: comment }) {
  return (
    <div className="w-[90%] p-3 shadow-md mt-4 shadow-primary rounded-lg">
      <div className="flex justify-between">
        <span className="font-bold">{commentData.author}</span>
        <span className="text-sm font-semibold text-black-faint">
          {commentData.date}
        </span>
      </div>
      <div className="p-3">
        <p>{commentData.comment}</p>
      </div>
    </div>
  );
}

export default CommentCard;

import React from "react";
import type { comment } from "../../lib/types";
import { Heart } from "lucide-react";

function CommentCard({ commentData }: { commentData: comment }) {
  const formatDate = Intl.DateTimeFormat("en-us", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  return (
    <div className="w-[90%] p-3 border-b mt-4 border-primary/10">
      <div className="flex justify-between">
        <span className="font-semibold text-sm">{commentData.author}</span>
        <span className="text-sm font-semibold text-white-faint">
          {formatDate.format(new Date(commentData._created_at))}
        </span>
        {/* <span className="flex gap-2">
          {commentData.likes}
          <Heart className="text-sm" />
        </span> */}
      </div>
      <div className="p-3 ">
        <p className="text-sm">{commentData.comment}</p>
      </div>
    </div>
  );
}

export default CommentCard;

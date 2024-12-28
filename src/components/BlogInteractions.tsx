import React from "react";
import { FaThumbsUp, FaThumbsDown, FaEye } from "react-icons/fa";

interface BlogInteractionsProps {
  likeCount: number;
  dislikeCount: number;
  viewsCount: number;
  userReaction: { data: { type: string } } | null;
  handleLike: () => void;
  handleDislike: () => void;
}

const BlogInteractions: React.FC<BlogInteractionsProps> = ({
  likeCount,
  dislikeCount,
  viewsCount,
  userReaction,
  handleLike,
  handleDislike,
}) => {
  return (
    <div className="flex justify-between items-center bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center gap-6">
        <button
          className={`flex items-center space-x-2 font-medium ${
            userReaction?.data?.type === "like"
              ? "text-green-500"
              : "text-gray-500"
          }`}
          onClick={handleLike}
        >
          <FaThumbsUp className="text-xl" />
          <span>Like ({likeCount})</span>
        </button>
        <button
          className={`flex items-center space-x-2 font-medium ${
            userReaction?.data?.type === "dislike"
              ? "text-red-500"
              : "text-gray-500"
          }`}
          onClick={handleDislike}
        >
          <FaThumbsDown className="text-xl" />
          <span>Dislike ({dislikeCount})</span>
        </button>
      </div>
      <div className="flex items-center gap-2 text-gray-600 font-medium">
        <FaEye className="text-xl text-blue-500" />
        <span>{viewsCount} Views</span>
      </div>
    </div>
  );
};

export default BlogInteractions;
export type { BlogInteractionsProps };

import {
  FaThumbsUp,
  FaThumbsDown,
  FaEdit,
  FaTrash,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import Spinner from "./Spinner";
import { useState } from "react";
import { useGetTotalCommentsForBlog } from "../hooks/services";

interface BlogCommentsProps {
  comments: Array<{
    id: string;
    user: {
      _id: string;
      firstName: string;
      lastName: string;
    };
    content: string;
    createdAt: string;
    reaction: string | null;
    likeCount: number;
    dislikeCount: number;
    replies: Array<{
      id: string;
      user: {
        _id: string;
        firstName: string;
        lastName: string;
      };
      content: string;
      createdAt: string;
      reaction: string | null;
      likeCount: number;
      dislikeCount: number;
    }>;
  }>;
  newComment: string;
  setNewComment: (comment: string) => void;
  handleAddComment: () => void;
  isAddingComment: boolean;
  editingCommentId: string | null;
  setEditingCommentId: (id: string | null) => void;
  editingCommentContent: string;
  setEditingCommentContent: (content: string) => void;
  handleEditComment: (id: string) => void;
  isEditingComment: boolean;
  handleDeleteComment: (id: string) => void;
  isDeletingComment: boolean;
  handleCommentReaction: (id: string, reaction: string) => void;
  replyingToCommentId: string | null;
  setReplyingToCommentId: (id: string | null) => void;
  replyContent: string;
  setReplyContent: (content: string) => void;
  handleAddReply: (id: string) => void;
  isAddingReply: boolean;
  commentsLoading: boolean;
  commentsError: boolean;
  loggedInUserId: string;
  handleReplyReaction: (id: string, reaction: string) => void;
  editingReplyId: string | null;
  setEditingReplyId: (id: string | null) => void;
  editingReplyContent: string;
  setEditingReplyContent: (content: string) => void;
  handleEditReply: (id: string) => void;
  isEditingReply: boolean;
  handleDeleteReply: (id: string) => void;
  isDeletingReply: boolean;
  blogId: string;
  totalComments: number;
}

const BlogComments = ({
  comments,
  newComment,
  setNewComment,
  handleAddComment,
  isAddingComment,
  editingCommentId,
  setEditingCommentId,
  editingCommentContent,
  setEditingCommentContent,
  handleEditComment,
  isEditingComment,
  handleDeleteComment,
  isDeletingComment,
  handleCommentReaction,
  replyingToCommentId,
  setReplyingToCommentId,
  replyContent,
  setReplyContent,
  handleAddReply,
  isAddingReply,
  commentsLoading,
  commentsError,
  loggedInUserId,
  handleReplyReaction,
  editingReplyId,
  setEditingReplyId,
  editingReplyContent,
  setEditingReplyContent,
  handleEditReply,
  isEditingReply,
  handleDeleteReply,
  isDeletingReply,
  blogId,
  totalComments,
}: BlogCommentsProps) => {
  const [expandedComments, setExpandedComments] = useState<string[]>([]);
  const { isError, isLoading } = useGetTotalCommentsForBlog(blogId);
  console.log("comments", totalComments);
  console.log("blogiD", blogId);
  const toggleReplies = (commentId: string) => {
    setExpandedComments((prev) =>
      prev.includes(commentId)
        ? prev.filter((id) => id !== commentId)
        : [...prev, commentId]
    );
  };

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">Comments</h2>
      {isLoading ? (
        <Spinner />
      ) : isError ? (
        <p className="text-red-500">Failed to load total comments</p>
      ) : (
        <p className="text-gray-500 mb-4">Total Comments: {totalComments}</p>
      )}
      <div className="flex items-start space-x-4 mb-6">
        <textarea
          placeholder="Add a public comment..."
          className="w-full border border-gray-300 rounded-md p-2 focus:ring-primary-100"
          rows={2}
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button
          className="px-4 py-2 bg-primary-100 text-white font-medium rounded-md hover:bg-primary-200 transition"
          disabled={isAddingComment}
          onClick={handleAddComment}
        >
          {isAddingComment ? "Posting..." : "Comment"}
        </button>
      </div>
      <div className="space-y-4">
        {commentsLoading ? (
          <Spinner />
        ) : commentsError ? (
          <p className="text-red-500">Failed to load comments</p>
        ) : comments.length === 0 ? (
          <p className="text-gray-500">
            No comments yet. Be the first to comment!
          </p>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="space-y-2">
              <div className="flex space-x-4">
                <div className="flex-1">
                  <p className="font-semibold">
                    {comment.user.firstName} {comment.user.lastName}
                  </p>
                  <p className="text-sm text-gray-500">
                    {new Date(comment.createdAt).toLocaleString()}
                  </p>
                  <p className="mt-1">{comment.content}</p>
                  {editingCommentId === comment.id ? (
                    <div className="mt-2">
                      <textarea
                        className="w-full border border-gray-300 rounded-md p-2"
                        rows={1}
                        value={editingCommentContent}
                        onChange={(e) =>
                          setEditingCommentContent(e.target.value)
                        }
                      />
                      <div className="flex space-x-2 mt-2">
                        <button
                          className="px-4 py-1 bg-gray-300 text-gray-700 rounded-md"
                          onClick={() => setEditingCommentId(null)}
                        >
                          Cancel
                        </button>
                        <button
                          className="px-4 py-1 bg-primary-100 text-white rounded-md"
                          disabled={isEditingComment}
                          onClick={() => handleEditComment(comment.id)}
                        >
                          {isEditingComment ? "Saving..." : "Save"}
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-4 mt-2 text-gray-600">
                      <button
                        onClick={() =>
                          handleCommentReaction(comment.id, "like")
                        }
                        className={`flex items-center space-x-1 ${
                          comment.reaction === "like" ? "text-green-600" : ""
                        }`}
                      >
                        <FaThumbsUp />
                        <span>{comment.likeCount}</span>
                      </button>
                      <button
                        onClick={() =>
                          handleCommentReaction(comment.id, "dislike")
                        }
                        className={`flex items-center space-x-1 ${
                          comment.reaction === "dislike" ? "text-red-600" : ""
                        }`}
                      >
                        <FaThumbsDown />
                        <span>{comment.dislikeCount}</span>
                      </button>
                      <button
                        onClick={() => setReplyingToCommentId(comment.id)}
                        className="text-primary-100"
                      >
                        Reply
                      </button>
                      {comment.user._id === loggedInUserId && (
                        <>
                          <button
                            onClick={() => {
                              setEditingCommentId(comment.id);
                              setEditingCommentContent(comment.content);
                            }}
                            className="text-blue-500"
                          >
                            <FaEdit />
                          </button>
                          <button
                            onClick={() => handleDeleteComment(comment.id)}
                            disabled={isDeletingComment}
                            className="text-red-500"
                          >
                            <FaTrash />
                          </button>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>
              {replyingToCommentId === comment.id && (
                <div className="ml-8 space-y-2">
                  <textarea
                    className="w-full border border-gray-300 rounded-md p-2"
                    rows={1}
                    placeholder="Write a reply..."
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                  />
                  <div className="flex space-x-2">
                    <button
                      className="px-4 py-1 bg-gray-300 text-gray-700 rounded-md"
                      onClick={() => setReplyingToCommentId(null)}
                    >
                      Cancel
                    </button>
                    <button
                      className="px-4 py-1 bg-primary-100 text-white rounded-md"
                      disabled={isAddingReply}
                      onClick={() => handleAddReply(comment.id)}
                    >
                      {isAddingReply ? "Replying..." : "Reply"}
                    </button>
                  </div>
                </div>
              )}
              {(comment.replies?.length ?? 0) > 0 && (
                <div className="ml-8 mt-4">
                  <button
                    className="text-primary-100 flex items-center"
                    onClick={() => toggleReplies(comment.id)}
                  >
                    {expandedComments.includes(comment.id) ? (
                      <>
                        <FaChevronUp className="mr-1" />
                        Hide replies
                      </>
                    ) : (
                      <>
                        <FaChevronDown className="mr-1" />
                        {`${(comment.replies ?? []).length} replies`}
                      </>
                    )}
                  </button>
                  {expandedComments.includes(comment.id) &&
                    (comment.replies ?? []).map(
                      (reply: {
                        id: string;
                        user: {
                          _id: string;
                          firstName: string;
                          lastName: string;
                        };
                        content: string;
                        createdAt: string;
                        reaction: string | null;
                        likeCount: number;
                        dislikeCount: number;
                      }) => (
                        <div key={reply.id} className="ml-4">
                          <p className="font-semibold">
                            {reply.user.firstName} {reply.user.lastName}
                          </p>
                          <p className="text-sm text-gray-500">
                            {new Date(reply.createdAt).toLocaleString()}
                          </p>
                          <p className="mt-1">{reply.content}</p>
                          {editingReplyId === reply.id ? (
                            <div className="mt-2">
                              <textarea
                                className="w-full border border-gray-300 rounded-md p-2"
                                rows={1}
                                value={editingReplyContent}
                                onChange={(e) =>
                                  setEditingReplyContent(e.target.value)
                                }
                              />
                              <div className="flex space-x-2 mt-2">
                                <button
                                  className="px-4 py-1 bg-gray-300 text-gray-700 rounded-md"
                                  onClick={() => setEditingReplyId(null)}
                                >
                                  Cancel
                                </button>
                                <button
                                  className="px-4 py-1 bg-primary-100 text-white rounded-md"
                                  disabled={isEditingReply}
                                  onClick={() => handleEditReply(reply.id)}
                                >
                                  {isEditingReply ? "Saving..." : "Save"}
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div className="flex items-center space-x-4 mt-2 text-gray-600">
                              <button
                                onClick={() =>
                                  handleReplyReaction(reply.id, "like")
                                }
                                className={`flex items-center space-x-1 ${
                                  reply.reaction === "like"
                                    ? "text-green-600"
                                    : ""
                                }`}
                              >
                                <FaThumbsUp />
                                <span>{reply.likeCount}</span>
                              </button>
                              <button
                                onClick={() =>
                                  handleReplyReaction(reply.id, "dislike")
                                }
                                className={`flex items-center space-x-1 ${
                                  reply.reaction === "dislike"
                                    ? "text-red-600"
                                    : ""
                                }`}
                              >
                                <FaThumbsDown />
                                <span>{reply.dislikeCount}</span>
                              </button>
                              <button
                                onClick={() => setReplyingToCommentId(reply.id)}
                                className="text-primary-100"
                              >
                                Reply
                              </button>
                              {reply.user._id === loggedInUserId && (
                                <>
                                  <button
                                    onClick={() => {
                                      setEditingReplyId(reply.id);
                                      setEditingReplyContent(reply.content);
                                    }}
                                    className="text-blue-500"
                                  >
                                    <FaEdit />
                                  </button>
                                  <button
                                    onClick={() => handleDeleteReply(reply.id)}
                                    disabled={isDeletingReply}
                                    className="text-red-500"
                                  >
                                    <FaTrash />
                                  </button>
                                </>
                              )}
                            </div>
                          )}
                          {replyingToCommentId === reply.id && (
                            <div className="ml-8 space-y-2">
                              <textarea
                                className="w-full border border-gray-300 rounded-md p-2"
                                rows={1}
                                placeholder="Write a reply..."
                                value={replyContent}
                                onChange={(e) =>
                                  setReplyContent(e.target.value)
                                }
                              />
                              <div className="flex space-x-2">
                                <button
                                  className="px-4 py-1 bg-gray-300 text-gray-700 rounded-md"
                                  onClick={() => setReplyingToCommentId(null)}
                                >
                                  Cancel
                                </button>
                                <button
                                  className="px-4 py-1 bg-primary-100 text-white rounded-md"
                                  disabled={isAddingReply}
                                  onClick={() => handleAddReply(reply.id)}
                                >
                                  {isAddingReply ? "Replying..." : "Reply"}
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      )
                    )}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default BlogComments;

import { motion, AnimatePresence } from "framer-motion";
import {
  FaThumbsUp,
  FaThumbsDown,
  FaEdit,
  FaTrash,
  FaChevronDown,
  FaChevronUp,
  FaReply,
} from "react-icons/fa";
import { formatDistanceToNow } from "date-fns";
import Spinner from "../Spinner";
import { useState } from "react";
import React from "react";
import { BlogCommentsProps } from "../../types/clientType";
const CommentCard = ({ comment, isReply = false, ...props }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showReplies, setShowReplies] = useState(false);
  const hasReplies = comment.replies && comment.replies.length > 0;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`relative ${!isReply ? "border-b" : ""} border-gray-100 py-6`}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="flex gap-4">
        {/* Avatar */}
        <div className="flex-shrink-0">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary-100 to-primary-200 flex items-center justify-center text-white font-semibold">
            {comment.user.firstName[0]}
            {comment.user.lastName[0]}
          </div>
        </div>

        {/* Content */}
        <div className="flex-grow">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-semibold text-gray-900">
              {comment.user.firstName} {comment.user.lastName}
            </span>
            <span className="text-sm text-gray-500">
              {formatDistanceToNow(new Date(comment.createdAt), {
                addSuffix: true,
              })}
            </span>
          </div>

          {props.editingCommentId === comment.id ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-2"
            >
              <textarea
                value={props.editingCommentContent}
                onChange={(e) => props.setEditingCommentContent(e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-100 focus:border-transparent"
                rows={3}
              />
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => props.handleEditComment(comment.id)}
                  disabled={props.isEditingComment}
                  className="px-4 py-2 bg-primary-100 text-white rounded-lg hover:bg-primary-200 transition-colors"
                >
                  {props.isEditingComment ? <Spinner /> : "Save"}
                </button>
                <button
                  onClick={() => props.setEditingCommentId(null)}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          ) : (
            <p className="text-gray-700">{comment.content}</p>
          )}

          {/* Actions */}
          <div className="flex items-center gap-4 mt-3">
            <button
              onClick={() => props.handleCommentReaction(comment.id, "like")}
              className={`flex items-center gap-1 text-sm ${
                comment.reaction === "like"
                  ? "text-primary-100"
                  : "text-gray-500 hover:text-primary-100"
              } transition-colors`}
            >
              <FaThumbsUp />
              <span>{comment.likeCount}</span>
            </button>
            <button
              onClick={() => props.handleCommentReaction(comment.id, "dislike")}
              className={`flex items-center gap-1 text-sm ${
                comment.reaction === "dislike"
                  ? "text-red-500"
                  : "text-gray-500 hover:text-red-500"
              } transition-colors`}
            >
              <FaThumbsDown />
              <span>{comment.dislikeCount}</span>
            </button>
            {!isReply && (
              <button
                onClick={() => props.setReplyingToCommentId(comment.id)}
                className="flex items-center gap-1 text-sm text-gray-500 hover:text-primary-100 transition-colors"
              >
                <FaReply />
                <span>Reply</span>
              </button>
            )}

            {/* Show Replies Toggle */}
            {!isReply && hasReplies && (
              <button
                onClick={() => setShowReplies(!showReplies)}
                className="flex items-center gap-1 text-sm text-gray-500 hover:text-primary-100 transition-colors ml-auto"
              >
                {showReplies ? <FaChevronUp /> : <FaChevronDown />}
                <span>
                  {comment.replies.length}{" "}
                  {comment.replies.length === 1 ? "reply" : "replies"}
                </span>
              </button>
            )}
          </div>

          {/* User Actions */}
          {props.loggedInUserId === comment.user._id && (
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="absolute top-6 right-6 flex gap-2"
                >
                  <button
                    onClick={() => {
                      props.setEditingCommentId(comment.id);
                      props.setEditingCommentContent(comment.content);
                    }}
                    className="p-2 text-gray-500 hover:text-primary-100 transition-colors"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => props.handleDeleteComment(comment.id)}
                    className="p-2 text-gray-500 hover:text-red-500 transition-colors"
                  >
                    <FaTrash />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          )}

          {/* Replies Section */}
          {!isReply && (
            <>
              {/* Reply Form */}
              {props.replyingToCommentId === comment.id && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="ml-12 mt-4"
                >
                  <textarea
                    value={props.replyContent}
                    onChange={(e) => props.setReplyContent(e.target.value)}
                    placeholder="Write a reply..."
                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-100 focus:border-transparent"
                    rows={3}
                  />
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => props.handleAddReply(comment.id)}
                      disabled={props.isAddingReply}
                      className="px-4 py-2 bg-primary-100 text-white rounded-lg hover:bg-primary-200 transition-colors"
                    >
                      {props.isAddingReply ? <Spinner /> : "Reply"}
                    </button>
                    <button
                      onClick={() => props.setReplyingToCommentId(null)}
                      className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Replies List */}
              <AnimatePresence>
                {showReplies && hasReplies && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="ml-12 mt-4 space-y-4 overflow-hidden"
                  >
                    {comment.replies.map((reply) => (
                      <CommentCard
                        key={reply.id}
                        comment={reply}
                        isReply={true}
                        {...{
                          editingReplyId: props.editingReplyId,
                          setEditingReplyId: props.setEditingReplyId,
                          editingReplyContent: props.editingReplyContent,
                          setEditingReplyContent: props.setEditingReplyContent,
                          handleEditReply: props.handleEditReply,
                          isEditingReply: props.isEditingReply,
                          handleDeleteReply: props.handleDeleteReply,
                          handleReplyReaction: props.handleReplyReaction,
                          loggedInUserId: props.loggedInUserId,
                        }}
                      />
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
};

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
  // isDeletingComment,
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
  // isDeletingReply,
  // blogId,
  totalComments,
}: BlogCommentsProps) => {
  const [showAllComments, setShowAllComments] = useState(false);
  const displayedComments = showAllComments ? comments : comments.slice(0, 3);

  if (commentsLoading) return <Spinner />;
  if (commentsError) return <div>Error loading comments</div>;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto mt-12"
    >
      <div className="bg-white rounded-xl shadow-md p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Comments ({totalComments})
        </h2>

        {/* Add Comment */}
        <div className="mb-8">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            className="w-full p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-100 focus:border-transparent resize-none"
            rows={4}
          />
          <div className="flex justify-end mt-2">
            <button
              onClick={handleAddComment}
              disabled={isAddingComment || !newComment.trim()}
              className="px-6 py-2 bg-primary-100 text-white rounded-lg hover:bg-primary-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isAddingComment ? <Spinner /> : "Post Comment"}
            </button>
          </div>
        </div>

        {/* Comments List */}
        <div className="space-y-6">
          <AnimatePresence>
            {displayedComments.map((comment) => (
              <CommentCard
                key={comment.id}
                comment={comment}
                {...{
                  editingCommentId,
                  setEditingCommentId,
                  editingCommentContent,
                  setEditingCommentContent,
                  handleEditComment,
                  isEditingComment,
                  handleDeleteComment,
                  handleCommentReaction,
                  replyingToCommentId,
                  setReplyingToCommentId,
                  replyContent,
                  setReplyContent,
                  handleAddReply,
                  isAddingReply,
                  loggedInUserId,
                  editingReplyId,
                  setEditingReplyId,
                  editingReplyContent,
                  setEditingReplyContent,
                  handleEditReply,
                  isEditingReply,
                  handleDeleteReply,
                  handleReplyReaction,
                }}
              />
            ))}
          </AnimatePresence>
        </div>

        {/* Show More Comments */}
        {comments.length > 3 && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowAllComments(!showAllComments)}
            className="w-full mt-6 px-6 py-3 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
          >
            {showAllComments ? (
              <>
                Show Less <FaChevronUp />
              </>
            ) : (
              <>
                Show More Comments <FaChevronDown />
              </>
            )}
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};

export default BlogComments;

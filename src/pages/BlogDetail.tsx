import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  useAddComment,
  useDeleteComment,
  useEditComment,
  useGetBlogBySlug,
  useGetCommentByBlogId,
  useIncrementView,
  useAddLike,
  useAddDislike,
  useRemoveReaction,
  useGetUserReactionOnBlog,
  useGetReactionsForBlog,
  useCommentReaction,
  useAddReply,
} from "../hooks/services";
import Spinner from "../components/Spinner";
import useAuth from "../store/useAuth";
import socket from "../utils/socket";
import PageDisplayer from "../components/PageDisplayer";
import BlogHero from "../components/blog/BlogHero";
import BlogInteractions from "../components/blog/BlogInteractions";
import BlogContent from "../components/blog/BlogContent";
import BlogComments from "../components/blog/BlogComments";
import BlogSidebar from "../components/blog/BlogSidebar";
import Blogs from "../sections/Blogs";
import React from "react";
import { Comment } from "../types/clientType";
function BlogDetail() {
  const { slug } = useParams();
  const { blog, isError, isLoading } = useGetBlogBySlug(slug as string);
  const { addComment, isPending: isAddingComment } = useAddComment();
  const { editComment, isPending: isEditingComment } = useEditComment();
  const { deleteComment, isPending: isDeletingComment } = useDeleteComment();
  const { addLike } = useAddLike();
  const { addDislike } = useAddDislike();
  const { removeReaction } = useRemoveReaction();
  const { userReaction } = useGetUserReactionOnBlog(blog?.data?.id);
  const { reactions } = useGetReactionsForBlog(blog?.data?.id);
  const { incrementView } = useIncrementView();
  const { commentReaction } = useCommentReaction();
  const { addReply, isPending: isAddingReply } = useAddReply();
  const [likeCount, setLikeCount] = useState(0);
  const [dislikeCount, setDislikeCount] = useState(0);
  const [viewsCount, setViewsCount] = useState(0);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editingCommentContent, setEditingCommentContent] = useState("");
  const { user } = useAuth();
  const loggedInUserId = user?.id;
  const [replyingToCommentId, setReplyingToCommentId] = useState<string | null>(
    null
  );
  const [replyContent, setReplyContent] = useState("");

  useEffect(() => {
    if (reactions && typeof reactions === "object" && "data" in reactions) {
      setLikeCount(
        (
          reactions.data as {
            likes: { count: number };
            dislikes: { count: number };
          }
        ).likes.count
      );
      setDislikeCount(
        (reactions.data as { dislikes: { count: number } }).dislikes.count
      );
    }
  }, [reactions]);

  useEffect(() => {
    if (blog?.data?.id) {
      incrementView(blog.data.id)
        .then((response) => {
          if (response?.data?.views !== undefined) {
            setViewsCount(response.data.views);
          } else if (response?.data?.message === "Already viewed") {
            setViewsCount(blog.data.views);
          } else {
            console.error(
              "Failed to increment view count: No data in response"
            );
          }
        })
        .catch((error) => {
          console.error("Failed to increment view count", error);
        });
    }
  }, [blog, incrementView]);

  useEffect(() => {
    if (blog?.data?.id) {
      socket.emit("joinBlog", blog.data.id);
      const handleNewComment = (comment: Comment) => {
        setComments((prevComments) => {
          const updatedComments = [
            comment,
            ...prevComments.filter((c) => c.id !== `temp-${comment.createdAt}`),
          ];
          console.log("Updated comments:", updatedComments);
          return updatedComments;
        });
      };

      const handleDeleteComment = (comment: Comment) => {
        console.log("Delete comment received:", comment);
        setComments((prevComments) =>
          prevComments.filter((c) => c.id !== comment.id)
        );
      };

      const handleReactionUpdated = (reaction: {
        commentId: string;
        likeCount: number;
        dislikeCount: number;
        type: string;
      }) => {
        setComments((prevComments) =>
          prevComments.map((comment) =>
            comment.id === reaction.commentId
              ? {
                  ...comment,
                  likeCount: reaction.likeCount,
                  dislikeCount: reaction.dislikeCount,
                  reaction: reaction.type,
                }
              : comment
          )
        );
      };

      const handleReactionRemoved = (reaction: {
        commentId: string;
        likeCount: number;
        dislikeCount: number;
      }) => {
        setComments((prevComments) =>
          prevComments.map((comment) =>
            comment.id === reaction.commentId
              ? {
                  ...comment,
                  likeCount: reaction.likeCount,
                  dislikeCount: reaction.dislikeCount,
                  reaction: null,
                }
              : comment
          )
        );
      };

      socket.on("newComment", handleNewComment);
      socket.on("deleteComment", handleDeleteComment);
      socket.on("reactionUpdated", handleReactionUpdated);
      socket.on("reactionRemoved", handleReactionRemoved);

      return () => {
        socket.emit("leaveBlog", blog.data.id);
        socket.off("newComment", handleNewComment);
        socket.off("deleteComment", handleDeleteComment);
        socket.off("reactionUpdated", handleReactionUpdated);
        socket.off("reactionRemoved", handleReactionRemoved);
      };
    }
  }, [blog]);

  const {
    comments: commentsData,
    isError: commentsError,
    isLoading: commentsLoading,
  } = useGetCommentByBlogId(blog?.data?.id) as {
    comments: { data: Comment[] } | null;
    isError: boolean;
    isLoading: boolean;
  };

  useEffect(() => {
    if (commentsData?.data) {
      const initializedComments = commentsData.data.map((comment: Comment) => ({
        ...comment,
        reaction: null,
      }));
      setComments(initializedComments);
    }
  }, [commentsData]);

  if (isLoading) return <Spinner />;
  if (isError || !blog)
    return (
      <p className="text-center text-red-500 text-lg font-medium">
        Blog not found!
      </p>
    );

  const handleLike = async () => {
    try {
      if (
        userReaction &&
        typeof userReaction === "object" &&
        "data" in userReaction &&
        (userReaction as { data: { type: string } })?.data?.type === "like"
      ) {
        setLikeCount((prev) => prev - 1);
        await removeReaction({ blogId: blog?.data.id, type: "like" });
      } else {
        if (
          userReaction &&
          typeof userReaction === "object" &&
          "data" in userReaction &&
          (userReaction as { data: { type: string } })?.data?.type === "dislike"
        ) {
          setDislikeCount((prev) => prev - 1);
        }
        setLikeCount((prev) => prev + 1);
        await addLike(blog?.data.id);
      }
    } catch (error) {
      console.error("Failed to toggle like", error);
      if (
        userReaction &&
        typeof userReaction === "object" &&
        "data" in userReaction &&
        (userReaction as { data: { type: string } })?.data?.type === "like"
      ) {
        setLikeCount((prev) => prev + 1);
      } else {
        if (
          userReaction &&
          typeof userReaction === "object" &&
          "data" in userReaction &&
          (userReaction as { data: { type: string } })?.data?.type === "dislike"
        ) {
          setDislikeCount((prev) => prev + 1);
        }
        setLikeCount((prev) => prev - 1);
      }
    }
  };

  const handleDislike = async () => {
    try {
      if (
        userReaction &&
        typeof userReaction === "object" &&
        "data" in userReaction &&
        (userReaction as { data: { type: string } })?.data?.type === "dislike"
      ) {
        setDislikeCount((prev) => prev - 1);
        await removeReaction({ blogId: blog?.data.id, type: "dislike" });
      } else {
        if (
          userReaction &&
          typeof userReaction === "object" &&
          "data" in userReaction &&
          (userReaction as { data: { type: string } })?.data?.type === "like"
        ) {
          setLikeCount((prev) => prev - 1);
        }
        setDislikeCount((prev) => prev + 1);
        await addDislike(blog?.data.id);
      }
    } catch (error) {
      console.error("Failed to toggle dislike", error);
      if (
        userReaction &&
        typeof userReaction === "object" &&
        "data" in userReaction &&
        (userReaction as { data: { type: string } })?.data?.type === "dislike"
      ) {
        setDislikeCount((prev) => prev + 1);
      } else {
        if (
          userReaction &&
          typeof userReaction === "object" &&
          "data" in userReaction &&
          (userReaction as { data: { type: string } })?.data?.type === "like"
        ) {
          setLikeCount((prev) => prev + 1);
        }
        setDislikeCount((prev) => prev - 1);
      }
    }
  };

  return (
    <div className="bg-gray-50">
      <PageDisplayer />
      <BlogHero blog={blog.data} />
      <div className="px-6 md:px-12 lg:px-20 py-16 space-y-16">
        <BlogInteractions
          likeCount={likeCount}
          dislikeCount={dislikeCount}
          viewsCount={viewsCount}
          userReaction={userReaction as { data: { type: string } } | null}
          handleLike={handleLike}
          handleDislike={handleDislike}
        />
        <div className="grid grid-cols-1 lg:grid-cols-[70%,30%] gap-12">
          <BlogContent blog={blog.data} />
          <BlogSidebar />
        </div>
        <BlogComments
          comments={comments}
          newComment={newComment}
          setNewComment={setNewComment}
          handleAddComment={async () => {
            if (newComment.trim() === "") return;
            const tempComment = {
              id: `temp-${Date.now()}`,
              content: newComment,
              user: {
                _id: user?.id || "",
                firstName: user?.firstName || "",
                lastName: user?.lastName || "",
                id: user?.id || "",
              },
              createdAt: new Date().toISOString(),
              likeCount: 0,
              dislikeCount: 0,
              replies: [],
              reaction: null,
            };
            setComments((prevComments) => [tempComment, ...prevComments]);
            setNewComment("");
            try {
              await addComment({
                blogId: blog.data.id,
                content: newComment.trim(),
              });
              setComments((prevComments) =>
                prevComments.filter((comment) => comment.id !== tempComment.id)
              );
            } catch (error) {
              console.error("Failed to add comment", error);
              setComments((prevComments) =>
                prevComments.filter((comment) => comment.id !== tempComment.id)
              );
            }
          }}
          isAddingComment={isAddingComment}
          editingCommentId={editingCommentId}
          setEditingCommentId={setEditingCommentId}
          editingCommentContent={editingCommentContent}
          setEditingCommentContent={setEditingCommentContent}
          handleEditComment={async (commentId) => {
            if (editingCommentContent.trim() === "") return;
            const originalComment = comments.find(
              (comment) => comment.id === commentId
            );
            const updatedComments = comments.map((comment) =>
              comment.id === commentId
                ? { ...comment, content: editingCommentContent.trim() }
                : comment
            );
            setComments(updatedComments);
            try {
              const editedComment = await editComment({
                id: commentId,
                content: editingCommentContent.trim(),
              });
              setComments((prevComments) =>
                prevComments.map((comment) =>
                  comment.id === commentId
                    ? (editedComment as { data: Comment }).data
                    : comment
                )
              );
              setEditingCommentId(null);
              setEditingCommentContent("");
            } catch (error) {
              console.error("Failed to edit comment", error);
              setComments((prevComments) =>
                prevComments.map((comment) =>
                  comment.id === commentId && originalComment
                    ? originalComment
                    : comment
                )
              );
            }
          }}
          isEditingComment={isEditingComment}
          handleDeleteComment={async (commentId) => {
            const originalComments = [...comments];
            setComments(comments.filter((comment) => comment.id !== commentId));
            try {
              await deleteComment(commentId);
            } catch (error) {
              console.error("Failed to delete comment", error);
              setComments(originalComments);
            }
          }}
          isDeletingComment={isDeletingComment}
          handleCommentReaction={async (commentId, type) => {
            try {
              const existingComment = comments.find(
                (comment) => comment.id === commentId
              );
              const existingReaction = existingComment?.reaction;
              setComments((prevComments) =>
                prevComments.map((comment) =>
                  comment.id === commentId
                    ? {
                        ...comment,
                        reaction: existingReaction === type ? null : type,
                        likeCount:
                          type === "like"
                            ? existingReaction === "like"
                              ? comment.likeCount - 1
                              : comment.likeCount + 1
                            : existingReaction === "like"
                            ? comment.likeCount - 1
                            : comment.likeCount,
                        dislikeCount:
                          type === "dislike"
                            ? existingReaction === "dislike"
                              ? comment.dislikeCount - 1
                              : comment.dislikeCount + 1
                            : existingReaction === "dislike"
                            ? comment.dislikeCount - 1
                            : comment.dislikeCount,
                      }
                    : comment
                )
              );
              if (existingReaction === type) {
                await commentReaction({ commentId, type: "" });
              } else {
                await commentReaction({ commentId, type });
              }
            } catch (error) {
              console.error("Failed to react to comment", error);
              setComments((prevComments) =>
                prevComments.map((comment) =>
                  comment.id === commentId
                    ? {
                        ...comment,
                        reaction:
                          comment.reaction === type ? null : comment.reaction,
                        likeCount:
                          type === "like" && comment.reaction === "like"
                            ? comment.likeCount - 1
                            : type === "like"
                            ? comment.likeCount + 1
                            : comment.likeCount,
                        dislikeCount:
                          type === "dislike" && comment.reaction === "dislike"
                            ? comment.dislikeCount - 1
                            : type === "dislike"
                            ? comment.dislikeCount + 1
                            : comment.dislikeCount,
                      }
                    : comment
                )
              );
            }
          }}
          replyingToCommentId={replyingToCommentId}
          setReplyingToCommentId={setReplyingToCommentId}
          replyContent={replyContent}
          setReplyContent={setReplyContent}
          handleAddReply={async (commentId) => {
            if (replyContent.trim() === "") return;
            const tempReply = {
              id: `temp-${Date.now()}`,
              content: replyContent,
              user: {
                _id: user?.id || "",
                firstName: user?.firstName || "",
                lastName: user?.lastName || "",
                id: user?.id || "",
              },
              createdAt: new Date().toISOString(),
              likeCount: 0,
              dislikeCount: 0,
              replies: [],
              reaction: null,
            };
            setComments((prevComments) =>
              prevComments.map((comment) =>
                comment.id === commentId
                  ? { ...comment, replies: [...comment.replies, tempReply] }
                  : comment
              )
            );
            setReplyContent("");
            setReplyingToCommentId(null);
            try {
              const response = await addReply({
                commentId,
                content: replyContent.trim(),
              });
              const addedReply = (response as { data: Comment }).data;
              setComments((prevComments) =>
                prevComments.map((comment) =>
                  comment.id === commentId
                    ? {
                        ...comment,
                        replies: (comment.replies ?? []).map((reply) =>
                          reply.id === tempReply.id ? addedReply : reply
                        ),
                      }
                    : comment
                )
              );
            } catch (error) {
              console.error("Failed to add reply", error);
              setComments((prevComments) =>
                prevComments.map((comment) =>
                  comment.id === commentId
                    ? {
                        ...comment,
                        replies: (comment.replies ?? []).filter(
                          (reply) => reply.id !== tempReply.id
                        ),
                      }
                    : comment
                )
              );
            }
          }}
          isAddingReply={isAddingReply}
          commentsLoading={commentsLoading}
          commentsError={commentsError}
          loggedInUserId={loggedInUserId ?? ""}
          blogId={blog?.data?.id}
          handleReplyReaction={() => {}}
          editingReplyId={null}
          setEditingReplyId={() => {}}
          editingReplyContent=""
          setEditingReplyContent={() => {}}
          isEditingReply={false}
          handleEditReply={() => {}}
          handleDeleteReply={() => {}}
          isDeletingReply={false}
          totalComments={comments.length}
        />
      </div>
      <Blogs />
    </div>
  );
}

export default BlogDetail;

import React, { useState } from "react";
import { FaThumbsUp, FaThumbsDown, FaEye, FaTimes } from "react-icons/fa";
import DialogBox from "../ui/DialogBox";
import useAuth from "../../store/useAuth";
interface BlogInteractionsProps {
  likeCount: number;
  dislikeCount: number;
  viewsCount: number;
  userReaction?: "like" | "dislike" | null;
  handleLike: () => void;
  handleDislike: () => void;
}

// Custom Button Component
const CustomButton: React.FC<{
  onClick: () => void;
  active?: boolean;
  children: React.ReactNode;
  variant?: "outline" | "filled";
}> = ({ onClick, active, children, variant = "outline" }) => (
  <button
    onClick={onClick}
    className={`
      px-3 py-1.5 rounded-md border transition-colors duration-200 flex items-center gap-2
      ${
        active || variant === "filled"
          ? "bg-blue-500 text-white border-blue-500 hover:bg-blue-600"
          : "border-gray-300 hover:bg-gray-50"
      }
    `}
  >
    {children}
  </button>
);

const BlogInteractions: React.FC<BlogInteractionsProps> = ({
  likeCount,
  dislikeCount,
  viewsCount,
  userReaction,
  handleLike,
  handleDislike,
}) => {
  const { isAuthenticated } = useAuth();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogAction, setDialogAction] = useState<"like" | "dislike" | null>(
    null
  );

  const handleInteraction = (action: () => void, type: "like" | "dislike") => {
    if (isAuthenticated) {
      action();
    } else {
      setDialogAction(type);
      setIsDialogOpen(true);
    }
  };

  const InteractionButton = ({
    onClick,
    active,
    icon: Icon,
    count,
  }: {
    onClick: () => void;
    active?: boolean;
    icon: any;
    count: number;
  }) => (
    <CustomButton onClick={onClick} active={active}>
      <Icon className={active ? "text-white" : "text-gray-600"} />
      <span>{count}</span>
    </CustomButton>
  );

  return (
    <>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <InteractionButton
            onClick={() => handleInteraction(handleLike, "like")}
            active={userReaction === "like"}
            icon={FaThumbsUp}
            count={likeCount}
          />
          <InteractionButton
            onClick={() => handleInteraction(handleDislike, "dislike")}
            active={userReaction === "dislike"}
            icon={FaThumbsDown}
            count={dislikeCount}
          />
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <FaEye />
          <span>{viewsCount} Views</span>
        </div>
      </div>

      <DialogBox isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        <div className="text-center">
          <h3 className="text-lg font-semibold mb-2">
            Sign in to {dialogAction === "like" ? "like" : "dislike"} this post
          </h3>
          <p className="text-gray-600 mb-6">
            Join our community to like, comment and interact with blog posts.
          </p>
          <div className="flex justify-center gap-3">
            <CustomButton
              variant="outline"
              onClick={() => (window.location.href = "/auth?mode=signup")}
            >
              Sign up
            </CustomButton>
            <CustomButton
              variant="filled"
              onClick={() => (window.location.href = "/auth?mode=signin")}
            >
              Log in
            </CustomButton>
          </div>
        </div>
      </DialogBox>
    </>
  );
};

export default BlogInteractions;

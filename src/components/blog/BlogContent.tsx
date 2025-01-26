import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { FiShare2, FiBookmark, FiCopy, FiX } from "react-icons/fi";
import {
  FaTwitter,
  FaFacebook,
  FaLinkedin,
  FaWhatsapp,
  FaTelegram,
  FaReddit,
} from "react-icons/fa";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import React from "react";
import socket from "../../utils/socket";
import { useBookmarkBlog, useGetBookmarkStatus } from "../../hooks/services";
import useAuth from "../../store/useAuth";
interface Blog {
  id: string;
  content: string;
}

interface BlogContentProps {
  blog: Blog;
  title?: string;
}
interface SharePlatform {
  name: string;
  icon: React.ReactNode;
  color: string;
  getShareUrl: (url: string, title: string) => string;
}
const ShareModal = ({ isOpen, onClose, title = "" }) => {
  const currentUrl = window.location.href;
  const encodedUrl = encodeURIComponent(currentUrl);
  const encodedTitle = encodeURIComponent(title);
  const sharePlatforms: SharePlatform[] = [
    {
      name: "Twitter",
      icon: <FaTwitter className="w-5 h-5" />,
      color: "#1DA1F2",
      getShareUrl: (url, title) =>
        `https://twitter.com/intent/tweet?url=${url}&text=${title}`,
    },
    {
      name: "Facebook",
      icon: <FaFacebook className="w-5 h-5" />,
      color: "#4267B2",
      getShareUrl: (url) =>
        `https://www.facebook.com/sharer/sharer.php?u=${url}`,
    },
    {
      name: "LinkedIn",
      icon: <FaLinkedin className="w-5 h-5" />,
      color: "#0077B5",
      getShareUrl: (url, title) =>
        `https://www.linkedin.com/sharing/share-offsite/?url=${url}&title=${title}`,
    },
    {
      name: "WhatsApp",
      icon: <FaWhatsapp className="w-5 h-5" />,
      color: "#25D366",
      getShareUrl: (url, title) => `https://wa.me/?text=${title}%20${url}`,
    },
    {
      name: "Telegram",
      icon: <FaTelegram className="w-5 h-5" />,
      color: "#0088cc",
      getShareUrl: (url, title) =>
        `https://t.me/share/url?url=${url}&text=${title}`,
    },
    {
      name: "Reddit",
      icon: <FaReddit className="w-5 h-5" />,
      color: "#FF4500",
      getShareUrl: (url, title) =>
        `https://reddit.com/submit?url=${url}&title=${title}`,
    },
  ];

  const handleShare = async (platform: SharePlatform) => {
    try {
      const shareUrl = platform.getShareUrl(encodedUrl, encodedTitle);
      window.open(shareUrl, "_blank", "width=600,height=400");
      toast.success(`Sharing on ${platform.name}`);
    } catch {
      toast.error("Failed to share");
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      toast.success("Link copied to clipboard!");
    } catch {
      toast.error("Failed to copy link");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 px-4 md:px-0">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-lg bg-white rounded-2xl shadow-xl overflow-hidden"
          >
            {/* Header */}
            <div className="relative px-6 py-4 bg-gradient-to-r from-primary-100 to-orange-400">
              <h3 className="text-xl font-semibold text-white">
                Share this article
              </h3>
              <button
                onClick={onClose}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <FiX className="w-5 h-5 text-white" />
              </button>
            </div>

            <div className="p-6">
              {/* Share Buttons */}

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
                {sharePlatforms.map((platform) => (
                  <motion.button
                    key={platform.name}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleShare(platform)}
                    className="group flex flex-col items-center gap-2 p-3 rounded-xl 
                           hover:bg-gray-50 transition-all duration-200"
                  >
                    <div
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-white 
                             shadow-md group-hover:shadow-lg transition-shadow"
                      style={{ backgroundColor: platform.color }}
                    >
                      {platform.icon}
                    </div>
                    <span className="text-xs sm:text-sm text-gray-600 group-hover:text-gray-900">
                      {platform.name}
                    </span>
                  </motion.button>
                ))}
              </div>

              {/* Copy Link Section */}
              <div className="relative bg-gray-50 rounded-xl p-1">
                <input
                  type="text"
                  value={currentUrl}
                  readOnly
                  className="w-full pr-24 py-3 pl-4 bg-transparent text-sm text-gray-600 focus:outline-none"
                />
                <button
                  onClick={handleCopyLink}
                  className="absolute right-1 top-1/2 -translate-y-1/2 px-4 py-2 
                         bg-white text-primary-100 font-medium rounded-lg 
                         hover:bg-gray-50 transition-colors text-sm shadow-sm"
                >
                  Copy Link
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

// Mobile Action Button component
const MobileActionButton = ({
  icon: Icon,
  label,
  onClick,
}: {
  icon: React.ElementType;
  label: string;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-gray-50"
  >
    <Icon className="w-5 h-5 text-gray-600" />
    <span className="text-xs text-gray-600">{label}</span>
  </button>
);

// Floating Action Button component
const FloatingActionButton = ({
  icon: Icon,
  label,
  onClick,
  isActive = false,
}: {
  icon: React.ElementType;
  label: string;
  onClick: () => void;
  isActive?: boolean;
}) => (
  <div className="relative group">
    <button
      onClick={onClick}
      className="p-3 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-300 group-hover:bg-primary-100/10"
      aria-label={label}
    >
      <Icon
        className={`w-5 h-5 transition-all duration-300 ${
          isActive
            ? "fill-primary-100 text-primary-100"
            : "text-gray-600 group-hover:text-primary-100"
        }`}
      />
    </button>
    <span
      className="absolute left-full ml-2 py-1 px-2 bg-gray-800 text-white text-sm rounded 
                    opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap"
    >
      {label}
    </span>
  </div>
);

const BlogContent = ({ blog, title = "" }: BlogContentProps) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const { bookmarkBlog } = useBookmarkBlog();
  const { bookmarkStatus } = useGetBookmarkStatus(blog.id);
  const { user, isAuthenticated } = useAuth();
  useEffect(() => {
    if (isAuthenticated && bookmarkStatus?.data) {
      setIsBookmarked(bookmarkStatus.data.isBookmarked);
    }
  }, [bookmarkStatus, isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated) {
      socket.on("bookmark", ({ userId, isBookmarked }) => {
        if (userId === user?.id) {
          setIsBookmarked(isBookmarked);
        }
      });
      return () => {
        socket.off("bookmark");
      };
    }
  }, [isAuthenticated, user?.id]);

  const handleBookmark = async () => {
    if (!isAuthenticated) {
      toast.error("You need to be authenticated to bookmark");
      return;
    }
    try {
      await bookmarkBlog(blog.id);
      setIsBookmarked((prev) => !prev);
      toast.success(
        isBookmarked ? "Removed from bookmarks" : "Added to bookmarks"
      );
    } catch (error) {
      toast.error("Failed to update bookmark status");
    }
  };

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative max-w-4xl mx-auto px-4 md:px-6"
    >
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-100 to-orange-400 origin-left z-50"
        style={{ scaleX }}
      />

      {/* Floating Action Bar desktop */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
        className="hidden lg:flex flex-col fixed left-8 top-1/2 -translate-y-1/2 space-y-4 z-30"
      >
        {isAuthenticated && (
          <FloatingActionButton
            icon={FiBookmark}
            label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
            onClick={handleBookmark}
            isActive={isBookmarked}
          />
        )}

        <FloatingActionButton
          icon={FiCopy}
          label="Copy link"
          onClick={() => {
            navigator.clipboard.writeText(window.location.href);
            toast.success("Link copied to clipboard!");
          }}
        />
        <FloatingActionButton
          icon={FiShare2}
          label="Share article"
          onClick={() => setShowShareModal(true)}
        />
      </motion.div>

      {/* Main Content */}
      <div className="prose max-w-none prose-lg mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12">
          <div
            className="prose-headings:text-gray-800 
                     prose-h1:text-4xl prose-h1:font-bold
                     prose-h2:text-3xl prose-h2:font-semibold
                     prose-p:text-gray-600 prose-p:leading-relaxed
                     prose-a:text-primary-100 prose-a:no-underline hover:prose-a:text-primary-100/80
                     prose-strong:text-gray-800
                     prose-blockquote:border-l-4 prose-blockquote:border-primary-100
                     prose-blockquote:bg-gray-50 prose-blockquote:p-6 prose-blockquote:rounded-r-lg
                     prose-blockquote:italic prose-blockquote:text-gray-700
                     prose-code:text-primary-100 prose-code:bg-gray-50 prose-code:px-2 prose-code:py-0.5 prose-code:rounded
                     prose-img:rounded-xl prose-img:shadow-lg"
            dangerouslySetInnerHTML={{ __html: blog?.content }}
          />

          {/* Mobile Action Bar */}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="fixed bottom-0 left-0 right-0 lg:hidden bg-white border-t border-gray-100 
                        px-4 py-2 flex justify-around items-center z-30"
          >
            {isAuthenticated && (
              <MobileActionButton
                icon={FiBookmark}
                label="Save"
                onClick={handleBookmark}
              />
            )}

            <MobileActionButton
              icon={FiCopy}
              label="Copy"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                toast.success("Link copied to clipboard!");
              }}
            />
            <MobileActionButton
              icon={FiShare2}
              label="Share"
              onClick={() => setShowShareModal(true)}
            />
          </motion.div>
        </div>
      </div>

      {/* Share Modal */}
      <ShareModal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        title={title}
      />
    </motion.div>
  );
};

export default BlogContent;

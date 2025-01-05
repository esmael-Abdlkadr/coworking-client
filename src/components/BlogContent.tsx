import { motion, AnimatePresence } from "framer-motion";
import { FiShare2, FiBookmark, FiCopy, FiX } from "react-icons/fi";
import { 
  FaTwitter, 
  FaFacebook, 
  FaLinkedin, 
  FaWhatsapp,
  FaTelegram,
  FaReddit
} from "react-icons/fa";
import { useState } from "react";
import { toast } from "react-hot-toast";
import React from "react";

interface BlogContentProps {
  content: string;
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
      getShareUrl: (url, title) => 
        `https://wa.me/?text=${title}%20${url}`,
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
    } catch (error) {
      toast.error("Failed to share");
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      toast.success("Link copied to clipboard!");
    } catch (error) {
      toast.error("Failed to copy link");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl shadow-xl p-6 z-50 w-full max-w-md"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Share this article</h3>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>

            {/* Share Platforms */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              {sharePlatforms.map((platform) => (
                <motion.button
                  key={platform.name}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleShare(platform)}
                  className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white"
                    style={{ backgroundColor: platform.color }}
                  >
                    {platform.icon}
                  </div>
                  <span className="text-sm text-gray-600">{platform.name}</span>
                </motion.button>
              ))}
            </div>

            {/* Copy Link */}
            <div className="relative">
              <input
                type="text"
                value={currentUrl}
                readOnly
                className="w-full pr-24 py-3 pl-4 bg-gray-50 rounded-lg text-sm text-gray-600"
              />
              <button
                onClick={handleCopyLink}
                className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1.5 bg-primary-100 text-white rounded-md hover:bg-primary-200 transition-colors text-sm"
              >
                Copy
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const BlogContent = ({ content, title = "" }: BlogContentProps) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    toast.success(isBookmarked ? "Removed from bookmarks" : "Added to bookmarks");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative max-w-4xl mx-auto"
    >
      {/* Floating Action Bar */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="hidden lg:flex flex-col fixed left-8 top-1/2 -translate-y-1/2 space-y-4"
      >
        <button
          onClick={handleBookmark}
          className="p-3 rounded-full bg-white shadow-lg hover:shadow-xl transition-all group"
          aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
        >
          <FiBookmark
            className={`w-5 h-5 ${
              isBookmarked ? "fill-primary-100 text-primary-100" : "text-gray-600"
            } group-hover:scale-110 transition-transform`}
          />
        </button>
        <button
          onClick={() => {
            navigator.clipboard.writeText(window.location.href);
            toast.success("Link copied to clipboard!");
          }}
          className="p-3 rounded-full bg-white shadow-lg hover:shadow-xl transition-all group"
          aria-label="Copy link"
        >
          <FiCopy className="w-5 h-5 text-gray-600 group-hover:scale-110 transition-transform" />
        </button>
        <button
          onClick={() => setShowShareModal(true)}
          className="p-3 rounded-full bg-white shadow-lg hover:shadow-xl transition-all group"
          aria-label="Share article"
        >
          <FiShare2 className="w-5 h-5 text-gray-600 group-hover:scale-110 transition-transform" />
        </button>
      </motion.div>

      {/* Main Content */}
      <div className="prose max-w-none prose-lg mx-auto">
        <div className="bg-white rounded-xl shadow-md p-8 lg:p-12">
          {/* Reading Progress Bar */}
          <motion.div
            className="fixed top-0 left-0 right-0 h-1 bg-primary-100 origin-left"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.3 }}
          />

          {/* Content with Enhanced Typography */}
          <div
            className="prose-headings:text-gray-800 
                     prose-h1:text-4xl prose-h1:font-bold
                     prose-h2:text-3xl prose-h2:font-semibold
                     prose-p:text-gray-600 prose-p:leading-relaxed
                     prose-a:text-primary-100 prose-a:no-underline hover:prose-a:underline
                     prose-strong:text-gray-800
                     prose-blockquote:border-l-4 prose-blockquote:border-primary-100
                     prose-blockquote:bg-gray-50 prose-blockquote:p-4
                     prose-blockquote:italic prose-blockquote:text-gray-700
                     prose-code:text-primary-100 prose-code:bg-gray-50 prose-code:p-1 prose-code:rounded
                     prose-img:rounded-xl prose-img:shadow-lg"
            dangerouslySetInnerHTML={{ __html: content }}
          />

          {/* Mobile Action Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="lg:hidden flex justify-center gap-6 mt-8 pt-6 border-t"
          >
            <button
              onClick={handleBookmark}
              className="flex items-center gap-2 text-gray-600"
            >
              <FiBookmark className={isBookmarked ? "fill-primary-100 text-primary-100" : ""} />
              <span>Save</span>
            </button>
            <button
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                toast.success("Link copied to clipboard!");
              }}
              className="flex items-center gap-2 text-gray-600"
            >
              <FiCopy />
              <span>Copy</span>
            </button>
            <button
              onClick={() => setShowShareModal(true)}
              className="flex items-center gap-2 text-gray-600"
            >
              <FiShare2 />
              <span>Share</span>
            </button>
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

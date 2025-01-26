import React from "react";
import { motion } from "framer-motion";
import { useGetBookmarkedBlogs } from "../hooks/services";
import { FiBookmark, FiClock, FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";

const EmptyState = () => (
  <div className="flex flex-col items-center justify-center p-8 text-center">
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <FiBookmark className="w-16 h-16 text-gray-300 mb-4" />
    </motion.div>
    <h3 className="text-xl font-semibold text-gray-700 mb-2">
      No bookmarks yet
    </h3>
    <p className="text-gray-500 mb-6">
      Start saving your favorite articles for later!
    </p>
    <Link
      to="/"
      className="inline-flex items-center px-4 py-2 bg-primary-100 text-white rounded-lg
                 hover:bg-primary-100/90 transition-colors"
    >
      Browse Articles
    </Link>
  </div>
);

const LoadingState = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
    {[1, 2, 3].map((n) => (
      <div key={n} className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="h-48 bg-gray-200 animate-pulse" />
        <div className="p-6 space-y-4">
          <div className="h-6 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse" />
        </div>
      </div>
    ))}
  </div>
);

const BlogCard = ({ blog, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
  >
    <div className="relative h-48 overflow-hidden">
      <img
        src={blog.image}
        alt={blog.title}
        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
    </div>

    <div className="p-6">
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
        <FiClock className="w-4 h-4" />
        {new Date(blog.createdAt).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })}
      </div>

      <h3 className="text-lg font-semibold text-gray-800 mb-4 line-clamp-2">
        {blog.title}
      </h3>

      <Link
        to={`/blogs/${blog.slug}`}
        className="inline-flex items-center gap-2 text-primary-100 hover:gap-3 transition-all"
      >
        Read Article
        <FiArrowRight className="w-4 h-4" />
      </Link>
    </div>
  </motion.div>
);

function BookmarkedBlogs() {
  const { bookmarkedBlogs, isLoading, isError } = useGetBookmarkedBlogs();
  const blogs = bookmarkedBlogs?.bookmarkedBlogs || [];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-50"
    >
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-8">
          <FiBookmark className="w-6 h-6 text-primary-100" />
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            Your Bookmarked Articles
          </h1>
        </div>

        {isLoading && <LoadingState />}

        {isError && (
          <div className="text-center text-red-500 p-8">
            Error loading bookmarks. Please try again later.
          </div>
        )}

        {!isLoading && !isError && blogs.length === 0 && <EmptyState />}

        {!isLoading && !isError && blogs.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog, index) => (
              <BlogCard key={blog._id} blog={blog} index={index} />
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default BookmarkedBlogs;

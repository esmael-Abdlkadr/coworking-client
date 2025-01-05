import { motion } from "framer-motion";
import Tag from "./ui/Tag";
import writer from "/team2.jpg";
import { FiClock, FiCalendar, FiBookOpen } from "react-icons/fi";
import React from "react";

interface Blog {
  image: string;
  title: string;
  tags?: string[];
  author?: {
    firstName: string;
    lastName: string;
  };
  createdAt: string;
  readingTime: string;
}

const BlogHero = ({ blog }: { blog: Blog }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="relative w-full overflow-hidden">
      {/* Parallax Background */}
      <motion.div
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1 }}
        className="relative h-[500px] lg:h-[700px]"
      >
        <img
          src={blog.image}
          alt="Blog Detail"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
      </motion.div>

      {/* Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="absolute inset-0 flex flex-col justify-center items-center text-center space-y-6 px-4 max-w-6xl mx-auto"
      >
        {/* Tags */}
        <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-3">
          {blog.tags?.map((tag: string, index: number) => (
            <Tag key={index} title={tag} />
          ))}
        </motion.div>

        {/* Title */}
        <motion.h1
          variants={itemVariants}
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight"
        >
          {blog.title}
        </motion.h1>

        {/* Meta Information */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col md:flex-row items-center gap-6 text-white/90 text-sm md:text-base"
        >
          <div className="flex items-center gap-2">
            <FiCalendar className="w-4 h-4" />
            <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-2">
            <FiClock className="w-4 h-4" />
            <span>{blog.readingTime} read</span>
          </div>
          <div className="flex items-center gap-2">
            <FiBookOpen className="w-4 h-4" />
            <span>Article</span>
          </div>
        </motion.div>

        {/* Author */}
        <motion.div
          variants={itemVariants}
          className="flex items-center gap-4 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full"
        >
          <div className="relative">
            <img
              src={writer}
              alt="Writer"
              className="w-12 h-12 rounded-full object-cover border-2 border-white/50"
            />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
          </div>
          <div className="text-left">
            <p className="text-white/80 text-sm">Written by</p>
            <p className="text-white font-semibold">
              {`${blog.author?.firstName} ${blog.author?.lastName}`}
            </p>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full p-1">
            <motion.div
              animate={{
                y: [0, 12, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className="w-2 h-2 bg-white rounded-full mx-auto"
            />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default BlogHero;

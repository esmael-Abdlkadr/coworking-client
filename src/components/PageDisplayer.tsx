import React, { useEffect, useState } from "react";
import { capitalizeTitle } from "../utils/capitalize";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const PageDisplayer: React.FC = () => {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(false);
  const routeName = `${location.pathname.split("/")[1]}`;

  useEffect(() => {
    setIsVisible(true);
    return () => setIsVisible(false);
  }, [location]);

  const backgroundVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } }
  };

  const textVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { delay: 0.3, duration: 0.5 } }
  };

  const decorativeLineVariants = {
    hidden: { scaleX: 0 },
    visible: { scaleX: 1, transition: { delay: 0.5, duration: 0.7 } }
  };

  return (
    <motion.div
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      variants={backgroundVariants}
      className="relative w-full h-[200px] overflow-hidden"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-gray-900 to-black">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-20 h-20 border-l-2 border-t-2 border-white/20" />
        <div className="absolute top-0 right-0 w-20 h-20 border-r-2 border-t-2 border-white/20" />
        <div className="absolute bottom-0 left-0 w-20 h-20 border-l-2 border-b-2 border-white/20" />
        <div className="absolute bottom-0 right-0 w-20 h-20 border-r-2 border-b-2 border-white/20" />
      </div>

      {/* Content Container */}
      <div className="relative h-full flex flex-col items-center justify-center px-4">
        <motion.div
          variants={textVariants}
          className="text-center"
        >
          <h1 className="text-4xl lg:text-6xl text-white font-bold mb-4 tracking-wider">
            {capitalizeTitle(routeName)}
          </h1>
          
          <motion.div
            variants={decorativeLineVariants}
            className="w-24 h-1 mx-auto bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
          />
        </motion.div>

        {/* Animated Dots */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2
              }}
              className="w-2 h-2 rounded-full bg-white/50"
            />
          ))}
        </div>
      </div>

      {/* Animated Corner Accents */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="absolute top-4 right-4 w-8 h-8"
      >
        <div className="absolute inset-0 border-2 border-white/20 rounded-full" />
        <div className="absolute inset-2 border border-white/40 rounded-full" />
      </motion.div>
    </motion.div>
  );
};

export default PageDisplayer;

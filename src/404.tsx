import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import img from "/404.jpg";
import img2 from "/ast1.jpg";
import img3 from "/planet.jpg";
const NotFound = () => {
  return (
    <div className="relative h-screen w-full flex flex-col items-center justify-center bg-gradient-to-b from-blue-900 to-black text-white overflow-hidden">
      {/* Stars Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-full h-full bg-[url('/path-to-your-stars-image.jpg')] bg-cover opacity-20"></div>
      </div>

      {/* Floating Astronaut */}
      <motion.div
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="relative z-10 mb-8"
      >
        <img src={img2} alt="Lost Astronaut" className="w-52 md:w-64" />
      </motion.div>

      {/* 404 Message */}
      <h1 className="text-5xl md:text-7xl font-bold z-10">404</h1>
      <p className="text-xl md:text-2xl text-center mt-4 z-10">
        Oops! You seem lost in space.
      </p>

      {/* Back to Home Button */}
      <Link to="/">
        <button className="mt-8 px-6 py-3 bg-blue-600 rounded-md text-lg font-semibold hover:bg-blue-700 z-10">
          Take Me Home
        </button>
      </Link>

      {/* Floating Elements - Planets */}
      <motion.div
        animate={{ x: [0, 15, 0], y: [0, -15, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute top-1/3 right-1/4 z-0"
      >
        <img src={img} alt="Planet" className="w-32 md:w-48 opacity-75" />
      </motion.div>

      <motion.div
        animate={{ x: [0, -15, 0], y: [0, 15, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
        className="absolute bottom-1/4 left-1/3 z-0"
      >
        <img src={img3} alt="Planet" className="w-24 md:w-36 opacity-75" />
      </motion.div>
    </div>
  );
};

export default NotFound;

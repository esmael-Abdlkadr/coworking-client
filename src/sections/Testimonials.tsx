import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

import client1 from "/client-1.jpg";
import client2 from "/client-2.jpg";
import client3 from "/client-3.jpg";

const testimonials = [
  {
    id: 1,
    name: "John Doe",
    role: "Entrepreneur",
    message:
      "This coworking space is a game-changer for my business. The environment is so inspiring, and the amenities are top-notch!",
    avatar: client1,
  },
  {
    id: 2,
    name: "Jane Smith",
    role: "Freelance Designer",
    message:
      "I love the community here! The creative vibes and professional atmosphere make it my favorite place to work.",
    avatar: client2,
  },
  {
    id: 3,
    name: "Michael Brown",
    role: "Software Engineer",
    message:
      "24-hour access is a lifesaver! I can work whenever inspiration strikes, and the coffee is excellent.",
    avatar: client3,
  },
  {
    id: 4,
    name: "Esamel Abdu",
    role: "Entrepreneur",
    message:
      "This coworking space is a game-changer for my business. The environment is so inspiring, and the amenities are top-notch!",
    avatar: client1,
  },
  {
    id: 5,
    name: "Abebe Kebed",
    role: "Freelance Designer",
    message:
      "I love the community here! The creative vibes and professional atmosphere make it my favorite place to work.",
    avatar: client2,
  },
  {
    id: 6,
    name: "Michael Brown",
    role: "Software Engineer",
    message:
      "24-hour access is a lifesaver! I can work whenever inspiration strikes, and the coffee is excellent.",
    avatar: client3,
  },
];

function Testimonials() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const carouselVariants = {
    animate: {
      rotate: 360,
      transition: {
        duration: 10,
        repeat: Infinity,
        ease: "linear",
      },
    },
  };

  const spotlightVariants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 },
  };

  return (
    <section className="relative bg-black py-20 px-6 md:px-12 lg:px-20 overflow-hidden">
      {/* Parallax Animated Background */}
      <div className="absolute inset-0 z-0">
        <motion.div
          className="absolute top-0 left-0 w-[200px] h-[200px] bg-pink-500 rounded-full blur-3xl opacity-30"
          animate={{
            x: [0, 300, 0],
            y: [0, 100, 0],
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-blue-500 rounded-full blur-3xl opacity-30"
          animate={{
            x: [0, -300, 0],
            y: [0, -100, 0],
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      {/* Section Header */}
      <div className="relative z-10 text-center mb-16">
        <h2 className="text-5xl font-bold text-white capitalize mb-4">
          What Our Members Say
        </h2>
        <p className="text-lg text-gray-300">
          Discover how our coworking space transforms lives and businesses.
        </p>
      </div>

      {/* Spotlight Testimonial */}
      <div className="relative z-10 flex flex-col items-center gap-12">
        <AnimatePresence>
          <motion.div
            key={activeTestimonial}
            className="relative w-full md:w-3/4 lg:w-1/2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-3xl p-8 shadow-2xl"
            variants={spotlightVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.5 }}
          >
            <img
              src={testimonials[activeTestimonial].avatar}
              alt={testimonials[activeTestimonial].name}
              className="w-20 h-20 rounded-full border-4 border-white shadow-lg absolute -top-10 left-1/2 transform -translate-x-1/2"
            />
            <p className="text-lg text-white italic text-center">
              "{testimonials[activeTestimonial].message}"
            </p>
            <div className="mt-6 text-center">
              <h3 className="text-xl font-semibold text-white">
                {testimonials[activeTestimonial].name}
              </h3>
              <p className="text-sm text-gray-200">
                {testimonials[activeTestimonial].role}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Enhanced 3D Carousel */}
        <div className="relative w-[400px] h-[400px] lg:w-[500px] lg:h-[500px]">
          <motion.div
            className="absolute inset-0 flex justify-center items-center"
            variants={carouselVariants}
            animate="animate"
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                className={`absolute w-[100px] h-[100px] lg:w-[130px] lg:h-[130px] bg-gray-800 rounded-full border-2 border-primary-100 shadow-md cursor-pointer flex items-center justify-center ${
                  activeTestimonial === index ? "scale-125 z-20" : ""
                }`}
                style={{
                  transform: `rotate(${
                    (index / testimonials.length) * 360
                  }deg) translate(200px) rotate(-${
                    (index / testimonials.length) * 360
                  }deg)`,
                }}
                // whileHover={{ scale: 1.1 }}
                onClick={() => setActiveTestimonial(index)}
              >
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-[80px] h-[80px] rounded-full"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;

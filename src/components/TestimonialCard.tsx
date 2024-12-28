import { motion } from "framer-motion";

interface TestimonialCardProps {
  name: string;
  role: string;
  message: string;
  avatar: string;
}

function TestimonialCard({
  name,
  role,
  message,
  avatar,
}: TestimonialCardProps) {
  return (
    <motion.div
      className="relative bg-white rounded-2xl shadow-lg p-6 hover:scale-105 transition-transform duration-300"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      {/* Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-400 via-purple-500 to-pink-500 rounded-2xl opacity-10 blur-xl"></div>

      {/* Card Content */}
      <div className="relative z-10">
        <div className="flex items-center gap-4 mb-4">
          <img
            src={avatar}
            alt={`${name}'s avatar`}
            className="w-16 h-16 rounded-full object-cover border-4 border-primary-100 shadow-md"
          />
          <div>
            <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
            <p className="text-sm text-gray-500">{role}</p>
          </div>
        </div>
        <p className="text-gray-600 italic leading-relaxed">
          {message.split(" ").map((word, index) => (
            <span
              key={index}
              className={
                ["amazing", "inspiring", "excellent"].includes(
                  word.toLowerCase()
                )
                  ? "text-primary-100 font-semibold"
                  : ""
              }
            >
              {word}{" "}
            </span>
          ))}
        </p>
      </div>
    </motion.div>
  );
}

export default TestimonialCard;

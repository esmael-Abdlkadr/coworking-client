import { CiMedal, CiCalendarDate, CiMobile4 } from "react-icons/ci";
import { RiCustomerService2Line } from "react-icons/ri";
import { GiVirtualMarker } from "react-icons/gi";
import { MdCardMembership } from "react-icons/md";
import FeatureCard from "../components/FeatureCard";
import { motion } from "framer-motion";

const data = [
  {
    icon: CiMedal,
    title: "Our solution",
    description: "Browse our full range of products and services.",
    slug: "/solutions",
  },
  {
    icon: RiCustomerService2Line,
    title: "Talk to us",
    description: "Get in touch with our team for any queries.",
    slug: "/contact",
  },
  {
    icon: CiCalendarDate,
    title: "Book an appointment",
    description: "Book Workshop, Service, MOT, or Repair.",
    slug: "/book-appointment",
  },
  {
    icon: GiVirtualMarker,
    title: "Setup virtual offices",
    description:
      "Start building your virtual office with our award-winning services.",
    slug: "/virtual-offices",
  },
  {
    icon: MdCardMembership,
    title: "Buy membership",
    description:
      "Get access to our exclusive membership and enjoy the benefits.",
    slug: "/membership",
  },
  {
    icon: CiMobile4,
    title: "Explore our app",
    description: "Download our app and access our services on the go.",
    slug: "/app",
  },
];

function Features() {
  return (
    <section className="relative w-full py-16 px-6 lg:px-14">
      {/* Parallax Background */}

      {/* Content Section */}
      <div className="relative z-10">
        {/* Feature Cards */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {data.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default Features;

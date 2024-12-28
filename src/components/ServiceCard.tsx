import { IconType } from "react-icons";
import { GoArrowRight } from "react-icons/go";
import { Link } from "react-router-dom";

interface ServiceCardProps {
  icon: IconType;
  title: string;
  description: string;
  slug: string;
}

function ServiceCard({
  icon: Icon,
  title,
  description,
  slug,
}: ServiceCardProps) {
  return (
    <div className="shadow-lg w-[350px] h-[350px] 2xl:w-[500px] rounded-2xl bg-[#cbd5e1] px-6 py-8 hover:bg-primary-100 transition duration-300 group">
      {/* Icon */}
      <div className="w-[80px] h-[80px] mx-auto rounded-2xl bg-primary-100 flex items-center justify-center group-hover:bg-white transition duration-300">
        <Icon
          className="text-white group-hover:text-primary-100 transition duration-300"
          size={40}
        />
      </div>

      {/* Title & Description */}
      <div className="mt-8 text-center">
        <h3 className="text-2xl font-semibold text-black/90 group-hover:text-white transition duration-300">
          {title}
        </h3>
        <p className="text-lg mt-4 text-[#71717a] group-hover:text-white transition duration-300">
          {description}
        </p>
      </div>

      {/* Link */}
      <Link
        to={`/services/${slug}`}
        className="flex items-center justify-center gap-2 mt-6 text-[#ea580c] text-lg font-medium group-hover:text-white transition duration-300"
      >
        <span>Learn more</span>
        <GoArrowRight
          size={23}
          className="group-hover:text-white transition duration-300"
        />
      </Link>
    </div>
  );
}

export default ServiceCard;

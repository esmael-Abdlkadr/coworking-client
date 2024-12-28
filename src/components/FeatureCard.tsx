import { IconType } from "react-icons";
import { Link } from "react-router-dom";

interface FeatureCardProps {
  icon: IconType;
  title: string;
  description: string;
  slug: string;
}

function FeatureCard({
  icon: Icon,
  title,
  description,
  slug,
}: FeatureCardProps) {
  return (
    <div className="shadow-lg w-full sm:w-[350px] md:w-[400px] p-6 rounded-2xl bg-white flex flex-col hover:shadow-xl transition-shadow duration-300">
      {/* Icon and Title */}
      <div className="flex items-center gap-4">
        {/* Icon */}
        <div className="w-12 h-12 flex items-center justify-center bg-gray-100 rounded-full text-indigo-500">
          <Icon size={24} />
        </div>
        {/* Title */}
        <h3 className="text-xl font-semibold text-primary-100 underline">
          <Link to={slug} className="hover:underline">
            {title}
          </Link>
        </h3>
      </div>

      {/* Description */}
      <p className="mt-4 text-sm text-gray-600 leading-relaxed">
        {description}
      </p>
    </div>
  );
}

export default FeatureCard;

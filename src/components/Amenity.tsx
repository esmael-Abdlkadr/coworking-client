import { FC } from "react";
import { IconType } from "react-icons";

interface AmenitiesProps {
  icon: IconType;
  title: string;
}
const Amenity: FC<AmenitiesProps> = ({ icon: Icon, title }) => {
  return (
    <div className="flex flex-col items-center gap-4 p-6 bg-gray-50 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group">
      {/* icon */}

      <Icon
        className="text-primary-100 group-hover:scale-110 transition-transform duration-300"
        size={40}
      />

      <h3 className="text-lg font-medium text-black/80 group-hover:text-primary-100 transition-colors duration-300">
        {title}
      </h3>
    </div>
  );
};

export default Amenity;

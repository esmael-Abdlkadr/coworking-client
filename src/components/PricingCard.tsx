import { MdCheck } from "react-icons/md";

interface PlanCardProps {
  title: string;
  price: number;
  features: string[];
  description?: string;
}

const PlanCard = ({ title, price, features, description }: PlanCardProps) => {
  return (
    <div className="bg-white shadow-lg hover:shadow-2xl transition-all duration-500 rounded-xl overflow-hidden transform hover:scale-105">
      {/* Header Section */}
      <div className="bg-primary-100 text-white p-6 text-center">
        <h2 className="text-3xl font-semibold mb-2">{title}</h2>
        <p className="text-lg italic">{description}</p>
      </div>

      {/* Price Section */}
      <div className="p-8 space-y-4 text-center">
        <div className="flex items-end justify-center gap-2">
          <h1 className="text-5xl md:text-6xl font-bold text-[#0f172a]">
            {price} Birr
          </h1>
          <p className="text-xl text-primary-100 font-medium">/ Month</p>
        </div>

        {/* Features List */}
        <ul className="space-y-3 mt-6 text-left">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-4">
              <div className="bg-primary-100 w-8 h-8 rounded-full flex items-center justify-center">
                <MdCheck size={20} color="white" />
              </div>
              <p className="text-lg text-[#475569]">{feature}</p>
            </li>
          ))}
        </ul>

        {/* Button */}
        <button className="w-full mt-6 bg-primary-100 hover:bg-primary-200 text-white py-3 rounded-lg text-lg font-medium transition duration-300">
          Book Now
        </button>
      </div>
    </div>
  );
};

export default PlanCard;

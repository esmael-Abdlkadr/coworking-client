import React from "react";

interface HowItWorkProps {
  number: number;
  title: string;
  description: string;
}
const HowItWorkCard: React.FC<HowItWorkProps> = ({
  number,
  title,
  description,
}) => {
  return (
    <div className="flex flex-col gap-4 items-center justify-center">
      <div className="bg-primary-100 w-[70px] h-[70px] rounded-full flex items-center justify-center">
        <p className="text-white text-2xl font-semibold">0{number}</p>
      </div>

      <h2 className="text-2xl font-semibold text-black/80">{title}</h2>

      <p className="text-xl text-[#475569] leading-6  max-w-md text-center leading-8">
        {description}
      </p>
    </div>
  );
};

export default HowItWorkCard;

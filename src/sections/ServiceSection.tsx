import ServiceCard from "../components/ServiceCard";
import {
  FaChair,
  FaUserTie,
  FaLaptopHouse,
  FaChalkboardTeacher,
  FaMicrophoneAlt,
  FaCalendarAlt,
  FaQuestionCircle,
} from "react-icons/fa";
import { useGetServices } from "../hooks/services";
import Spinner from "../components/Spinner";
import React from "react";
interface ServiceSectionProps {
  isHome?: boolean;
}

function ServiceSection({ isHome }: ServiceSectionProps) {
  const { data, isLoading } = useGetServices();
  const iconsMap = {
    "Meeting Rooms": FaChair,
    "Virtual Offices": FaUserTie,
    "Dedicated Desks": FaLaptopHouse,
    "Private Offices": FaChalkboardTeacher,
    "Conference Rooms": FaMicrophoneAlt,
    "Event Spaces": FaCalendarAlt,
  };
  if (isLoading) return <Spinner />;
  const services = data?.data || [];
  return (
    <section className="bg-white w-full h-auto py-9 px-4 sm:px-6 xl:px-24">
      {/* Header Section */}
      <div
        className={`mt-10 flex flex-col gap-6 ${
          isHome ? "" : "items-center justify-center"
        }`}
      >
        <h2 className="text-3xl font-bold text-gray-800 text-center capitalize">
          Our Services
        </h2>

        <div
          className={` ${
            isHome ? "grid grid-cols-1 lg:grid-cols-2 gap-6" : "block"
          }`}
        >
          <h2
            className={`text-4xl font-semibold text-gray-800 capitalize ${
              isHome ? "" : "text-center"
            }`}
          >
            We offer a creative{" "}
            <span className="text-primary-100">environment</span>
          </h2>
          <p
            className={`${
              isHome ? "block" : "hidden"
            } text-lg font-medium text-[#4b5563] pl-4 border-l-4 border-primary-100`}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam.
          </p>
        </div>
      </div>

      {/* Cards Section */}
      <div
        className="mt-10 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
        style={{ placeItems: "center" }}
      >
        {services.map(
          (service: {
            id: string;
            title: keyof typeof iconsMap;
            CardDefinition: string;
            slug: string;
          }) => {
            const Icon = iconsMap[service.title] || FaQuestionCircle;
            return (
              <ServiceCard
                key={service.id}
                icon={Icon}
                title={service.title}
                description={service.CardDefinition}
                slug={service.slug}
              />
            );
          }
        )}
      </div>
    </section>
  );
}

export default ServiceSection;

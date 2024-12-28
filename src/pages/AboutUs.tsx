import PageDisplayer from "../components/PageDisplayer";
import aboutImg from "../asset/about-us.jpg";
import { MdCheck } from "react-icons/md";
import Button from "../components/ui/Button";
import { MdVisibility, MdFlag, MdStar } from "react-icons/md";
import React from "react";
import HowItWork from "../sections/HowItWork";
import Teams from "../sections/Teams";
import FAQ from "../sections/FAQ";
import ContactUs from "../sections/ContactUs";
import Footer from "../sections/Footer";

interface ValuesProps {
  icon: string;
  title: string;
  description: string;
}

const iconMapping: { [key: string]: React.ElementType } = {
  visibility: MdVisibility,
  flag: MdFlag,
  star: MdStar,
};
const ValuesComponent = ({ icon, title, description }: ValuesProps) => {
  const IconComponent = iconMapping[icon];
  return (
    <div className="relative group">
      {/* Card Container */}
      <div className="bg-[#ea580c] text-white w-full h-full p-6 rounded-lg shadow-xl transform group-hover:scale-105 transition-transform duration-300 ease-in-out">
        {/* Icon */}
        <div className="flex justify-center items-center mb-4">
          <div className="bg-white bg-opacity-20 w-16 h-16 flex items-center justify-center rounded-full shadow-md group-hover:bg-opacity-40 transition-all duration-300 ease-in-out">
            <IconComponent size={30} color="white" />
          </div>
        </div>
        {/* Title */}
        <h3 className="text-2xl font-bold text-center mb-2">{title}</h3>
        {/* Description */}
        <p className="text-center text-sm leading-relaxed text-white opacity-90">
          {description}
        </p>
      </div>
      {/* Floating Tooltip */}
      <div className="absolute opacity-0 group-hover:opacity-100 group-hover:translate-y-0 -translate-y-4 transition-all duration-300 ease-in-out top-0 left-1/2 transform -translate-x-1/2 bg-white text-[#ea580c] p-2 text-sm rounded-lg shadow-lg">
        Learn more about {title}
      </div>
    </div>
  );
};
const data = [
  {
    icon: "visibility",
    title: "Our Vision",
    description:
      "To redefine workspaces by creating inspiring environments that foster collaboration, innovation, and growth for professionals of all industries.",
  },
  {
    icon: "flag",
    title: "Our Mission",
    description:
      "To provide flexible, comfortable, and innovative coworking spaces that empower individuals and teams to thrive, while cultivating a vibrant and inclusive community.",
  },
  {
    icon: "star",
    title: "Core Values",
    description:
      "Versatile event spaces suitable for conferences, networking events, and corporate gatherings.",
  },
];

function AboutUs() {
  return (
    <div>
      <PageDisplayer />
      <div className="py-20 px-6 lg:px-14">
        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <img
              src={aboutImg}
              alt="About Us"
              className="rounded-3xl shadow-lg hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div>
            <h2 className="text-5xl font-bold text-[#1e293b] leading-tight mb-4">
              About Us
            </h2>
            <h3 className="text-3xl font-semibold text-primary-500">
              The Best Coworking Space
            </h3>
            <p className="text-lg text-[#6b7280] mt-4 leading-7">
              Versatile event spaces suitable for conferences, networking
              events, and corporate gatherings.
            </p>
            <ul className="mt-6 space-y-4">
              <li className="flex items-center gap-4">
                <div className="bg-primary-100 w-10 h-10 flex items-center justify-center rounded-full">
                  <MdCheck size={20} color="white" />
                </div>
                <span className="text-lg text-[#4b5563]">
                  Building collaborative communities
                </span>
              </li>
              <li className="flex items-center gap-4">
                <div className="bg-primary-100 w-10 h-10 flex items-center justify-center rounded-full">
                  <MdCheck size={20} color="white" />
                </div>
                <span className="text-lg text-[#4b5563]">
                  Where innovation meets community
                </span>
              </li>
              <li className="flex items-center gap-4">
                <div className="bg-primary-100 w-10 h-10 flex items-center justify-center rounded-full">
                  <MdCheck size={20} color="white" />
                </div>
                <span className="text-lg text-[#4b5563]">
                  Redefining workplace experiences
                </span>
              </li>
            </ul>
            <div className="mt-8">
              <Button title="Learn More" />
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mt-20 bg-[#f1f5f9] py-12 px-6 rounded-3xl shadow-lg">
          <h2 className="text-center text-4xl font-bold text-[#1e293b] mb-8">
            Our Values
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.map((item, index) => (
              <ValuesComponent key={index} {...item} />
            ))}
          </div>
        </div>

        {/* Other Sections */}
        <HowItWork />
        <Teams isPage={true} />
        <div className="bg-[#e2e8f0] py-12 px-6 rounded-2xl mt-16">
          <h2 className="text-4xl font-bold text-center text-[#1e293b] mb-6">
            FAQs
          </h2>
          <FAQ />
        </div>
        <ContactUs />
      </div>
      <Footer />
    </div>
  );
}

export default AboutUs;

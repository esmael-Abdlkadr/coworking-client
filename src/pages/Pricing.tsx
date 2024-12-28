import PageDisplayer from "../components/PageDisplayer";
import PlanCard from "../components/PricingCard";
import BookingForm from "../sections/BookingForm";
import { capitalizeTitle } from "../utils/capitalize";

const SubscriptionPlans = () => {
  const plans = [
    {
      title: "Meeting Rooms",
      description:
        "Perfect for teams needing access to professional meeting spaces. Ideal for collaboration and brainstorming sessions.",
      price: 1000,
      features: [
        "Access to fully-equipped meeting rooms",
        "10 GB secure cloud storage for team documents",
        "Video conferencing setup",
        "Whiteboards and presentation tools",
        "On-demand refreshments",
        "Flexible scheduling",
      ],
    },
    {
      title: "Private Offices",
      description:
        "Enjoy a dedicated workspace with privacy for your team. Ideal for companies requiring a secure office environment.",
      price: 20000,
      features: [
        "Private, fully furnished office",
        "100 GB secure cloud storage",
        "24/7 office access",
        "Dedicated high-speed internet connection",
        "Access to lounge and common areas",
        "Customizable office layout",
      ],
    },
    {
      title: "Dedicated Desk",
      description:
        "Secure a dedicated workspace just for you within a shared office space. Great for individuals who want a consistent workspace.",
      price: 20000,
      features: [
        "Personal desk in a shared office environment",
        "100 GB secure cloud storage",
        "Locker for personal items",
        "24/7 access to workspace",
        "Access to office facilities like printers and meeting rooms",
        "Networking opportunities with other professionals",
      ],
    },
    {
      title: "Conference Rooms",
      description:
        "Host professional meetings, presentations, or workshops in well-equipped conference rooms.",
      price: 20000,
      features: [
        "Large conference table with seating for 15",
        "State-of-the-art AV equipment",
        "100 GB secure cloud storage for presentations",
        "Video conferencing capabilities",
        "Catering options available",
        "On-site technical support",
      ],
    },
    {
      title: "Event Spaces",
      description:
        "Ideal for hosting corporate events, seminars, or social gatherings in a flexible, open space.",
      price: 20000,
      features: [
        "Spacious event area with customizable seating",
        "Professional lighting and sound systems",
        "100 GB secure cloud storage for event materials",
        "On-site catering and bar services",
        "Event planning and setup assistance",
        "Audio/visual support",
      ],
    },
    {
      title: "Virtual Offices",
      description:
        "Get a professional business address and access to essential office services while working remotely.",
      price: 20000,
      features: [
        "Prestigious business address",
        "Mail handling and forwarding services",
        "100 GB secure cloud storage for business documents",
        "Access to meeting rooms on demand",
        "Professional call answering service",
        "Virtual receptionist",
      ],
    },
  ];

  return (
    <div>
      <PageDisplayer />
      <div className="mx-[10px]   lg:m-[100px]  flex flex-col gap-10">
        <div className="flex flex-col items-center justify-center  mb-10">
          <h2 className="title mb-6">pricing model</h2>
          <div className="">
            <h2 className="main-title mb-1">
              {capitalizeTitle("our affordable")}
              <span className="text-primary-100   mr-2  italic underline decoration-orange-300  text-4xl md:text-6xl  text-center lg:text-start">
                {capitalizeTitle("pricing plans")}
              </span>{" "}
            </h2>
          </div>
        </div>

        <div className="grid  grid-cols-1   md:grid-cols-2  lg:grid-cols-3 gap-10 mt-10">
          {plans.map((plan, index) => (
            <PlanCard key={index} {...plan} />
          ))}
        </div>
      </div>
      <BookingForm />
    </div>
  );
};

export default SubscriptionPlans;

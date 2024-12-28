import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import PageDisplayer from "../components/PageDisplayer";
import img1 from "/detail1.jpg";

import { capitalizeTitle } from "../utils/capitalize";
import { MdCheck } from "react-icons/md";
import Spinner from "../components/Spinner";
import Button from "../components/ui/Button";

// Fetch service data
const fetchServiceBySlug = async (slug: string) => {
  const response = await axios.get(
    `https://coworking-server.onrender.com/api/Service/${slug}`
  );
  return response.data.service;
};

function ServiceDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const {
    data: service,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["service", slug],
    queryFn: () => fetchServiceBySlug(slug!),
    staleTime: 1000 * 60 * 60 * 24, // 1 day

    enabled: !!slug, //  runs when slug is available
    placeholderData: {
      title: "Loading...",
      description: "Fetching service details...",
      images: [],
      amenities: [],
      benefits: [],
    },
  });

  if (isLoading) return <Spinner />;
  if (isError || !service) return <p>Failed to load service details.</p>;
  return (
    <div>
      <PageDisplayer />

      {/* Main Section */}
      <div className="px-6 py-10 md:px-10 lg:px-20">
        {/* Service Image */}
        <img
          src={service.images?.[0] || img1} // Use first image or placeholder
          alt="Service Detail"
          className="h-[400px] md:h-[500px] lg:h-[600px] w-full object-cover rounded-3xl shadow-lg mb-10"
        />

        {/* Title and Description */}
        <div>
          <h1 className="text-3xl md:text-5xl capitalize font-medium text-[#111827]">
            {capitalizeTitle(`about ${service.title} services`)}
          </h1>
          <div className="mt-6 space-y-4">
            <p
              className="text-base md:text-lg text-[#334155] leading-relaxed text-justify"
              dangerouslySetInnerHTML={{ __html: service.description }} // Render HTML safely
            />
          </div>

          {/* Amenities Section */}
          <div className="mt-10">
            <h2 className="text-2xl md:text-3xl font-medium text-[#111827]">
              Amenities
            </h2>
            <ul className="mt-6 space-y-3">
              {service.amenities?.map((item: string, index: number) => (
                <li key={index} className="flex items-center gap-3">
                  <div className="bg-primary-100 w-[25px] h-[25px] rounded-full flex items-center justify-center">
                    <MdCheck size={20} color="white" />
                  </div>
                  <p className="text-[#334155]">{item}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Additional Images Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10">
          {service.images?.slice(1).map((image: string, index: number) => (
            <img
              key={index}
              src={image}
              className="w-full h-[300px] lg:h-[400px] object-cover rounded-2xl shadow-md"
              alt={`Additional image ${index + 1}`}
            />
          ))}
        </div>

        {/* Service Benefits Section */}
        <div className="mt-10">
          <h2 className="text-3xl md:text-5xl capitalize font-medium text-[#111827]">
            {capitalizeTitle("service benefits")}
          </h2>
          <ul className="mt-6 space-y-3">
            {service.benefits?.map((item: string, index: number) => (
              <li key={index} className="flex items-center gap-3">
                <div className="bg-primary-100 w-[25px] h-[25px] rounded-full flex items-center justify-center">
                  <MdCheck size={20} color="white" />
                </div>
                <p className="text-[#334155]">{item}</p>
              </li>
            ))}
          </ul>

          {/* Book Now Button */}
          <div className="mt-8 text-center">
            <Button
              title={"Book Now"}
              onClick={() =>
                navigate("/dashboard/booking/new", {
                  state: { serviceId: service.id },
                })
              }
            />
          </div>
        </div>
      </div>

      {/* <BookingForm /> */}
    </div>
  );
}

export default ServiceDetail;

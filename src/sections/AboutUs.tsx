import aboutImg from "../asset/about-us.jpg";
import { MdCheck } from "react-icons/md";
import Button from "../components/ui/Button";

function AboutUs() {
  return (
    <section className="w-full bg-[#e2e8f0]">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 px-6 sm:px-12 lg:px-24 py-16 lg:py-24">
        {/* Image Section */}
        <div className="flex items-center justify-center">
          <img
            src={aboutImg}
            alt="about us"
            className="w-full max-w-lg lg:max-w-full h-auto object-cover rounded-2xl shadow-lg"
          />
        </div>

        {/* Content Section */}
        <div className="flex flex-col justify-center items-start mt-6 lg:mt-0 space-y-8">
          <h2 className="text-3xl font-bold text-gray-800 capitalize">
            About us
          </h2>

          <h3 className="text-4xl font-semibold text-gray-800">
            The best coworking{" "}
            <span className="text-primary-100">space for better offices</span>
          </h3>

          <p className="text-lg text-[#4b5563] leading-8">
            Versatile event spaces suitable for conferences, networking events,
            and corporate gatherings. Our spaces foster collaboration, making
            every event memorable and impactful.
          </p>

          {/* List Section */}
          <ul className="space-y-4">
            {[
              "Building collaborative communities",
              "Empowering innovation",
              "Providing seamless experiences",
            ].map((text, index) => (
              <li
                key={index}
                className="flex items-center gap-4 text-lg text-[#4b5563]"
              >
                <div className="bg-primary-100 w-[30px] h-[30px] rounded-full flex items-center justify-center">
                  <MdCheck size={20} color="white" />
                </div>
                {text}
              </li>
            ))}
          </ul>

          {/* Button */}
          <div>
            <Button title="Learn More" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutUs;

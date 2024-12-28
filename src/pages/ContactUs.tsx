import PageDisplayer from "../components/PageDisplayer";
import ContactUsSection from "../sections/ContactUs";
import { CiLocationOn } from "react-icons/ci";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

interface ContactAddressProps {
  icon: string;
  title: string;
  description: string;
}

const iconMapping: { [key: string]: React.ElementType } = {
  phone: FaPhoneAlt,
  email: MdEmail,
  location: CiLocationOn,
};

const data = [
  {
    icon: "phone",
    title: "phone",
    description: "+251910203050",
  },
  {
    icon: "email",
    title: " email",
    description: "info@coworking.com",
  },
  {
    icon: "location",
    title: "location",
    description: "Addis Ababa, Ethiopia",
  },
];

function ContactAddress({ icon, title, description }: ContactAddressProps) {
  const IconComponent = iconMapping[icon];
  if (!IconComponent) {
    return <div>Icon not found</div>;
  }

  // Determine the link based on the icon type
  let link;
  if (icon === "phone") {
    link = `tel:${description}`;
  } else if (icon === "email") {
    link = `mailto:${description}`;
  } else if (icon === "location") {
    link = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      description
    )}`;
  }

  return (
    <div className="bg-[#e2e8f0]  w-[450px] h-[350px]  rounded-xl flex flex-col items-center justify-center gap-5">
      <div className="bg-primary-100 w-[90px] h-[90px] rounded-2xl flex items-center justify-center">
        <IconComponent size={40} color="white" />
      </div>
      <h3 className="text-xl font-semibold">{title}</h3>
      <a
        href={link}
        className="text-[#4b5563] text-center"
        target="_blank"
        rel="noopener noreferrer"
      >
        {description}
      </a>
    </div>
  );
}

function ContactUs() {
  return (
    <div>
      <PageDisplayer />
      <ContactUsSection />
      <div className="grid grid-cols-1  lg:grid-cols-3 gap-6  mx-14  my-10">
        {data.map((item, index) => (
          <ContactAddress
            key={index}
            icon={item.icon}
            title={item.title}
            description={item.description}
          />
        ))}
      </div>
      {/* TODO- add google map here    */}
    </div>
  );
}

export default ContactUs;

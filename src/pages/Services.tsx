import Banner from "../components/Banner";
import PageDisplayer from "../components/PageDisplayer";
import BookingForm from "../sections/BookingForm";
import ServiceSection from "../sections/ServiceSection";
import Testimonials from "../sections/Testimonials";

function Services() {
  return (
    <div>
      <PageDisplayer />
      <ServiceSection />
      <Banner />
      <BookingForm />
      <Testimonials />
    </div>
  );
}

export default Services;

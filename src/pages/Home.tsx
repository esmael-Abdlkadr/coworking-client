import AboutUs from "../sections/AboutUs";
import Amenities from "../sections/Amenities";
import Blogs from "../sections/Blogs";
import Events from "../sections/Events";
import Features from "../sections/Features";

import Gallery from "../sections/Gallery";
import Hero from "../sections/Hero";
import HowItWork from "../sections/HowItWork";
import ServiceSection from "../sections/ServiceSection";
import Teams from "../sections/Teams";
import Testimonials from "../sections/Testimonials";

function Home() {
  return (
    <div>
      <Hero />
      <Features />
      <ServiceSection isHome={true} />
      <AboutUs />
      <HowItWork />
      <Gallery />
      <Amenities />
      {/* <BookingForm /> */}
      <Events />
      <Testimonials />
      <Teams />
      <Blogs />
    </div>
  );
}

export default Home;

import CustomeInput from "../components/ui/CustomeInput";
// import { capitalizeTitle } from "../utils/capitalize";
import formImg from "../asset/formImg.jpg";
import CustomeSelecor from "../components/ui/CustomeSelecor";
import { Label } from "../components/ui/label";
import Button from "../components/ui/Button";
import Banner from "../components/Banner";

function BookingForm() {
  return (
    <div>
      <section className="w-full bg-[#e2e8f0] py-12">
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          {/* Section Title */}
          <h2 className="text-center text-3xl md:text-4xl lg:text-5xl font-bold mb-10 text-primary-700">
            Reserve Your Space
          </h2>

          {/* Form and Image Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Form Section */}
            <form className="bg-white/80 backdrop-blur-md p-8 rounded-3xl shadow-lg space-y-6">
              {/* Input Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <CustomeInput
                  label="Your Name"
                  type="text"
                  placeholder="Ex. Abebe Kebede"
                  id="name"
                />
                <CustomeInput
                  label="Email"
                  type="email"
                  placeholder="abebekebede@gmail.com"
                  id="email"
                />
                <CustomeInput
                  label="Phone Number"
                  type="phone"
                  placeholder="Enter your phone number"
                  id="phone"
                />
                <CustomeSelecor
                  label="Preferred Location"
                  id="location"
                  placeholder="Select Location"
                />
                <CustomeSelecor
                  label="Type of Space"
                  id="space"
                  placeholder="Select Type"
                />
              </div>

              {/* Message Field */}
              <div className="flex flex-col gap-2">
                <Label>Your Message</Label>
                <textarea
                  placeholder="Enter your message"
                  cols={30}
                  rows={6}
                  className="w-full p-4 rounded-xl border border-gray-300 focus:ring-primary-600 focus:border-primary-600 transition duration-300 ease-in-out"
                />
              </div>

              {/* Submit Button */}
              <div className="text-center">
                <Button title="Book Now" />
              </div>
            </form>

            {/* Image Section */}
            <div className=" hidden lg:flex justify-center items-center">
              <img
                src={formImg}
                alt="Office space"
                className="w-full h-auto rounded-3xl object-cover shadow-lg transform transition duration-500 hover:scale-105"
              />
            </div>
          </div>
        </div>
      </section>
      <Banner />
    </div>
  );
}

export default BookingForm;

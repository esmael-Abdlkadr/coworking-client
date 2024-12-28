import { capitalizeTitle } from "../utils/capitalize";
import formImg from "../asset/formImg.jpg";
import CustomeInput from "../components/ui/CustomeInput";
import { Label } from "../components/ui/label";
import Button from "../components/ui/Button";


function ContactUsSection() {
  return (
    <div className="w-white w-fl h-auto  mt-10">
      <div className="flex flex-col items-center justify-center  mb-10">
        <h2 className="title mb-6">contact us </h2>
        <div className="">
          <h2 className=" mb-1   text-primary-100   mr-2  italic  text-4xl md:text-6xl  text-center lg:text-start">
            {capitalizeTitle("connect with us ")}
            <span className="main-title">{capitalizeTitle("today")}</span>{" "}
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start  mx-[100px]">
        {/* Form Section */}
        <form className=" p-8 rounded-3xl  space-y-6">
          {/* Input Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <CustomeInput
              label="First Name"
              type="text"
              placeholder="Ex. Abebe Kebede"
              id="fName"
            />
            <CustomeInput
              label="Last Name"
              type="text"
              placeholder="Ex. Abebe Kebede"
              id="fName"
            />
            <CustomeInput
              label="Phone Number"
              type="text"
              placeholder="0920304050"
              id="phone"
            />

            <CustomeInput
              label="Phone Number"
              type="phone"
              placeholder="Enter your phone number"
              id="phone"
            />
          </div>

          {/* Message Field */}
          <CustomeInput
            label="Subject"
            type="subject"
            placeholder="Enter here..."
            id="subject"
          />
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
            <Button title="Send Message" />
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
      {/* <Banner /> */}
    </div>
  );
}

export default ContactUsSection;

import Button from "../components/ui/Button";
import { capitalizeTitle } from "../utils/capitalize";
import {
  FaFacebookF,
  FaTwitter,
  FaPinterestP,
  FaInstagramSquare,
  FaYoutube,
} from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import { ReactNode } from "react";

const IconWrapper = ({ children }: { children: ReactNode }) => (
  <div className="p-2 bg-primary-100 hover:bg-primary-200 w-[40px] h-[40px] rounded-full flex items-center justify-center transition duration-300">
    {children}
  </div>
);

function Footer() {
  return (
    <footer className="w-full bg-black/90">
      <div className="px-6 md:px-12 lg:px-20 py-10 flex flex-col gap-10">
        {/* Top Row - Headline and Button */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b-[3px] border-[#1f2937] pb-6">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium text-white/90 text-center md:text-left">
            {capitalizeTitle("ready to experience our space in person")}
          </h2>
          <Button title="Book Space" />
        </div>

        {/* Footer Grids */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10 border-b-[3px] border-[#1f2937] pb-10">
          {/* Column 1 - Logo and Socials */}
          <div className="flex flex-col gap-5 items-center text-center lg:items-start lg:text-left">
            <h1 className="text-white text-3xl">Coworking</h1>
            <p className="text-xl font-medium text-white/60">
              Grow your business by networking with local entrepreneurs.
            </p>
            <div className="flex gap-4">
              <IconWrapper>
                <FaFacebookF className="text-white text-2xl" />
              </IconWrapper>
              <IconWrapper>
                <FaTwitter className="text-white text-2xl" />
              </IconWrapper>
              <IconWrapper>
                <FaPinterestP className="text-white text-2xl" />
              </IconWrapper>
              <IconWrapper>
                <FaInstagramSquare className="text-white text-2xl" />
              </IconWrapper>
              <IconWrapper>
                <FaYoutube className="text-white text-2xl" />
              </IconWrapper>
            </div>
          </div>

          {/* Column 2 - Navigation and Contacts */}
          <div className="flex flex-col sm:flex-row justify-around gap-10">
            <div className="flex flex-col items-center sm:items-start gap-4">
              <h2 className="text-primary-100 text-2xl font-medium">
                Navigation
              </h2>
              <ul className="text-white/60 text-lg space-y-2">
                {[
                  "Home",
                  "Services",
                  "Location",
                  "FAQs",
                  "Pricing",
                  "Contact us",
                ].map((item) => (
                  <li
                    key={item}
                    className="hover:text-white transition duration-300 cursor-pointer"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col items-center sm:items-start gap-4">
              <h2 className="text-primary-100 text-2xl font-medium">
                Contacts
              </h2>
              <ul className="text-white/60 text-lg space-y-2">
                <li>+251 920 300 50</li>
                <li>info@coworking.com</li>
                <li>452, Golagol Tower, 22 Mazoria, Addis Ababa</li>
              </ul>
            </div>
          </div>

          {/* Column 3 - Newsletter */}
          <div className="flex flex-col gap-4 items-center lg:items-start">
            <h2 className="text-primary-100 text-2xl font-medium">
              Newsletter
            </h2>
            <p className="text-white/60 text-lg text-center lg:text-left">
              Subscribe to our newsletter to get our latest updates and offers.
            </p>
            <div className="flex w-full max-w-md">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full bg-[#27272a] text-white/90 px-5 py-4 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-primary-100"
              />
              <button className="bg-primary-100 hover:bg-primary-200 py-2 px-4 flex items-center justify-center rounded-r-lg transition duration-300">
                <IoSend className="text-white text-2xl" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Row - Copyright and Terms */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-4">
          <p className="text-white text-center md:text-left text-lg">
            © {new Date().getFullYear()}{" "}
            <span className="text-primary-100 font-medium">Coworking</span>. All
            rights reserved.
          </p>
          <div className="flex gap-4 text-white text-sm">
            <p className="hover:text-primary-100 transition duration-300 cursor-pointer">
              User terms & conditions
            </p>
            <p className="hover:text-primary-100 transition duration-300 cursor-pointer">
              Privacy Policy
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

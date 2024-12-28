import { FaWifi } from "react-icons/fa";
import {
  IoPrintOutline,
  IoCafeOutline,
  IoGameControllerOutline,
  IoLockClosedOutline,
} from "react-icons/io5";
import { LuParkingCircle } from "react-icons/lu";
import { TbClock24 } from "react-icons/tb";
import { MdEvent } from "react-icons/md";
import Amenity from "../components/Amenity";
import Banner from "../components/Banner";

const data = [
  { icon: FaWifi, title: "High-speed Internet" },
  { icon: IoPrintOutline, title: "Printing Services" },
  { icon: IoLockClosedOutline, title: "Lockers" },
  { icon: LuParkingCircle, title: "Parking" },
  { icon: TbClock24, title: "Open 24/7" },
  { icon: IoCafeOutline, title: "Cafeteria" },
  { icon: IoGameControllerOutline, title: "Game Zone" },
  { icon: MdEvent, title: "Event Spaces" },
];

function Amenities() {
  return (
    <section className="bg-white w-full py-16">
      <div className="flex flex-col items-center gap-10">
        {/* Section Title */}
        <h2 className="uppercase text-xl md:text-2xl lg:text-3xl text-black/80 tracking-[5px]">
          Amenities
        </h2>

        {/* Subtitle */}
        <h3 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-black/90 text-center max-w-3xl">
          Enhancing your workday with{" "}
          <span className="text-primary-100">top-notch Amenities</span>
        </h3>

        {/* Amenity Icons Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-10 mt-8">
          {data.map((item, index) => (
            <Amenity key={index} icon={item.icon} title={item.title} />
          ))}
        </div>
      </div>

      {/* Banner Component */}
      <Banner />
    </section>
  );
}

export default Amenities;

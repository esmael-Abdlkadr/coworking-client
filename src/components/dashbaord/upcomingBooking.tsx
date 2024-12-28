import { motion } from "framer-motion";
import { useState } from "react";

const bookings = [
  {
    id: 1,
    space: "Private Office",
    date: "2024-12-01",
    time: "10:00 AM - 6:00 PM",
    status: "Confirmed",
  },
  {
    id: 2,
    space: "Conference Room",
    date: "2024-12-05",
    time: "2:00 PM - 4:00 PM",
    status: "Pending",
  },
  {
    id: 3,
    space: "Hot Desk",
    date: "2024-12-10",
    time: "9:00 AM - 5:00 PM",
    status: "Confirmed",
  },
];

function UpcomingBookings() {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextBooking = () =>
    setActiveIndex((prevIndex) => (prevIndex + 1) % bookings.length);
  const prevBooking = () =>
    setActiveIndex(
      (prevIndex) => (prevIndex - 1 + bookings.length) % bookings.length
    );

  return (
    <div className="w-full max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
      <div className="relative flex items-center justify-between">
        <button
          onClick={prevBooking}
          className="absolute left-0 bg-gray-200 p-2 rounded-full shadow-md hover:bg-gray-300"
        >
          {"<"}
        </button>
        <motion.div
          key={bookings[activeIndex].id}
          className="flex flex-col items-center"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-xl font-semibold">
            {bookings[activeIndex].space}
          </h3>
          <p className="text-gray-500">{bookings[activeIndex].date}</p>
          <p className="text-gray-500">{bookings[activeIndex].time}</p>
          <span
            className={`py-1 px-3 rounded-full text-sm ${
              bookings[activeIndex].status === "Confirmed"
                ? "bg-green-100 text-green-600"
                : "bg-yellow-100 text-yellow-600"
            }`}
          >
            {bookings[activeIndex].status}
          </span>
        </motion.div>
        <button
          onClick={nextBooking}
          className="absolute right-0 bg-gray-200 p-2 rounded-full shadow-md hover:bg-gray-300"
        >
          {">"}
        </button>
      </div>
    </div>
  );
}

export default UpcomingBookings;

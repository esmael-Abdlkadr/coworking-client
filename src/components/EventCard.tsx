import { FC, useState } from "react";
import { capitalizeTitle } from "../utils/capitalize";
import { MdArrowForward } from "react-icons/md";
import { AiFillClockCircle } from "react-icons/ai";
import { BsCalendar2DateFill } from "react-icons/bs";
import { FaTag, FaMapMarkerAlt } from "react-icons/fa";
import {
  useGetReservations,
  useReserveSpot,
  useCancelReservation,
} from "../hooks/services";

import showToast from "../utils/toastHelper";
import ConfirmationModal from "./ui/ConfirmationModal";

interface EventCardProps {
  eventId: string;
  img: string;
  eventCategory: string;
  eventName: string;
  eventDate: string;
  eventDescription: string;
  eventTime: string;
  eventLocation: string;
  isOnPage?: boolean;
}

interface Reservation {
  event: { id: string };
  status: string;
  id: string;
}

interface ReservationsData {
  reservations: Reservation[];
}

const EventCard: FC<EventCardProps> = ({
  eventId,
  img,
  eventCategory,
  eventName,
  eventDate,
  eventDescription,
  eventTime,
  eventLocation,
  isOnPage,
}) => {
  const { reserveSpot } = useReserveSpot();
  const { cancelReservation } = useCancelReservation();
  const { data } = useGetReservations() as { data: ReservationsData };
  const [isWaitlistModalOpen, setIsWaitlistModalOpen] = useState(false);

  const reservation = data?.reservations?.find(
    (reservation) =>
      reservation.event.id === eventId && reservation.status === "reserved"
  );

  const handleReserve = async () => {
    try {
      await reserveSpot({ eventId });
    } catch (error: unknown) {
      if (
        (
          error as {
            response?: { status?: number; data?: { message?: string } };
          }
        ).response?.status === 400 &&
        (
          error as {
            response?: { status?: number; data?: { message?: string } };
          }
        ).response?.data?.message === "Event is fully booked"
      ) {
        setIsWaitlistModalOpen(true);
      } else {
        console.error("Error creating reservation", error);
        showToast(
          (error as { response?: { data?: { message?: string } } }).response
            ?.data?.message || "Unexpected error occurred. Please try again.",
          "error"
        );
      }
    }
  };

  const handleCancel = async () => {
    try {
      if (reservation) {
        await cancelReservation(reservation.id);
      }
    } catch (error) {
      console.error("Error cancelling reservation", error);
    }
  };

  const handleWaitlistConfirm = async () => {
    try {
      await reserveSpot({ eventId, waitlist: true });
      setIsWaitlistModalOpen(false);
    } catch (error: unknown) {
      console.error("Error adding to waitlist", error);
      showToast(
        (error as { response?: { data?: { message?: string } } }).response?.data
          ?.message || "Unexpected error occurred. Please try again.",
        "error"
      );
    }
  };

  return (
    <div
      className={`w-full ${
        isOnPage ? "bg-[#e2e8f0]" : "bg-[#27272a]"
      } rounded-xl grid md:grid-cols-[30%,55%,15%] grid-cols-1 gap-6 p-6 
      transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-105 relative`}
    >
      {/* Reserved Flag */}
      {reservation && (
        <div className="absolute top-4 right-4 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
          Reserved
        </div>
      )}

      {/* Image Section */}
      <div className="flex items-center justify-center">
        <img
          src={img}
          alt="Event"
          className="w-full max-h-[250px] object-cover rounded-lg shadow-md transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Description Section */}
      <div className="flex flex-col gap-4 mt-4 md:mt-0">
        {/* Event Category */}
        <h3
          className={`uppercase text-lg md:text-2xl tracking-[3px] md:tracking-[5px] ${
            isOnPage ? "text-black/80" : "text-white/70"
          }`}
        >
          {eventCategory}
        </h3>

        {/* Event Title */}
        <h2
          className={`text-2xl md:text-3xl font-semibold ${
            isOnPage ? "text-black" : "text-white"
          }`}
        >
          {capitalizeTitle(eventName)}
        </h2>

        {/* Event Description */}
        <div
          className={`text-base md:text-lg leading-6 md:leading-8 ${
            isOnPage ? "text-[#6b7280]" : "text-white/80"
          }`}
          dangerouslySetInnerHTML={{
            __html: capitalizeTitle(eventDescription),
          }}
        />

        {/* Date, Time, Location, and Category Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          <div className="flex items-center gap-2">
            <BsCalendar2DateFill size={20} className="text-primary-100" />
            <span
              className={`text-sm md:text-base ${
                isOnPage ? "text-[#6b7280]" : "text-white/70"
              }`}
            >
              {eventDate}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <AiFillClockCircle size={20} className="text-primary-100" />
            <span
              className={`text-sm md:text-base ${
                isOnPage ? "text-[#6b7280]" : "text-white/70"
              }`}
            >
              {eventTime}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <FaMapMarkerAlt size={20} className="text-primary-100" />
            <span
              className={`text-sm md:text-base ${
                isOnPage ? "text-[#6b7280]" : "text-white/70"
              }`}
            >
              {eventLocation}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <FaTag size={20} className="text-primary-100" />
            <span
              className={`text-sm md:text-base ${
                isOnPage ? "text-[#6b7280]" : "text-white/70"
              }`}
            >
              {eventCategory}
            </span>
          </div>
        </div>
      </div>

      {/* Link Section */}
      <div className="relative flex items-center justify-center mt-4 md:mt-0">
        {/* Vertical Divider */}
        <div className="absolute left-0 h-[150px] md:h-[200px] border-l-[2px] md:border-l-[3px] border-[#52525b] hidden md:block"></div>

        <div className="relative flex items-center justify-center mt-4 md:mt-0">
          <button
            onClick={reservation ? handleCancel : handleReserve}
            className={`relative px-8 py-4 ${
              reservation
                ? "bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500"
                : "bg-gradient-to-r from-purple-500 via-blue-500 to-green-500"
            } text-white font-semibold text-lg md:text-xl rounded-full shadow-lg group overflow-hidden transition-all duration-300 transform ${
              reservation
                ? "hover:scale-110 active:scale-95"
                : "hover:scale-110 active:scale-95"
            }`}
          >
            {/* Glowing Border */}
            <div
              className={`absolute inset-0 rounded-full ${
                reservation
                  ? "bg-gradient-to-r from-red-600 to-yellow-600"
                  : "bg-gradient-to-r from-pink-500 to-purple-500"
              } opacity-50 blur-md group-hover:opacity-75 transition duration-300`}
            ></div>

            {/* Particle Effect */}
            <div className="absolute inset-0 rounded-full overflow-hidden">
              <div
                className={`absolute w-[200%] h-[200%] ${
                  reservation ? "bg-cancel-particles" : "bg-particles"
                } group-hover:animate-particles`}
              ></div>
            </div>

            {/* Text and Icon */}
            <div className="relative z-10 flex items-center gap-2">
              <span>{reservation ? "Cancel" : "RSRV"}</span>
              {reservation ? (
                <AiFillClockCircle
                  className="transition-transform duration-300 group-hover:rotate-90"
                  size={22}
                />
              ) : (
                <MdArrowForward
                  className="transition-transform duration-300 group-hover:translate-x-2"
                  size={22}
                />
              )}
            </div>
          </button>

          {/* Particle Animation Styles */}
          <style>{`
            .bg-particles {
              background: radial-gradient(circle, white 10%, transparent 20%) 0 0 / 5px 5px;
            }
            .bg-cancel-particles {
              background: radial-gradient(circle, rgba(255, 255, 255, 0.3) 10%, transparent 20%) 0 0 / 5px 5px;
            }
            .animate-particles {
              animation: move-particles 2s infinite linear;
            }
            @keyframes move-particles {
              from {
                transform: translate(0, 0);
              }
              to {
                transform: translate(-50%, -50%);
              }
            }
          `}</style>
        </div>
      </div>

      {/* Waitlist Confirmation Modal */}
      <ConfirmationModal
        isOpen={isWaitlistModalOpen}
        onClose={() => setIsWaitlistModalOpen(false)}
        onConfirm={handleWaitlistConfirm}
        title="Join Waitlist"
        message="The event is full. Would you like to join the waitlist?"
      />
    </div>
  );
};

export default EventCard;

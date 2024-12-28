import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCancelBooking, useGetBooking } from "../../hooks/services";
import { FaRegCalendarAlt, FaTrashAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import Spinner from "../Spinner";
import Modal from "../ui/Modal";
import UpdateBooking from "./UpdateBooking";

const BookingDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [opneUpdateModal, setOpenUpdateModal] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { cancelBooking } = useCancelBooking(id ? parseInt(id) : 0);
  // const [] = useUpdateBooking(id);
  const { booking, loader } = useGetBooking(id ? parseInt(id) : 0) as {
    booking: {
      booking: {
        id: string;
        user: {
          firstName: string;
          lastName: string;
          email: string;
        };
        service: {
          title: string;
          description: string;
          prichourlyRate: number;
          location: string[];
          amenities: string[];
          benefits: string[];
          images: string[];
        };
        bookingDate: string;
        startTime: string;
        endTime: string;
        duration: number;
        price: number;
        status: string;
      };
    };
    loader: boolean;
  };

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      await cancelBooking();
      navigate("/dashboard/bookings");
    } catch {
      setError("Failed to delete booking. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  // const handleReschedule = () => {
  //   navigate(`/dashboard/bookings/${booking.booking.id}/reschedule`);
  // };

  if (loader) return <Spinner />;

  return (
    <motion.div
      className="booking-detail-container max-w-4xl mx-auto p-8 bg-white/80 shadow-xl rounded-lg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {error && (
        <div className="error-message text-red-500 font-semibold mb-6 text-center">
          {error}
        </div>
      )}

      <h2 className="text-4xl font-extrabold text-gray-500 mb-8 text-center tracking-wide drop-shadow-sm">
        Booking Details
      </h2>

      <motion.div
        className="user-info bg-gray-800 p-6 rounded-lg shadow-xl mb-8"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h3 className="text-2xl font-semibold text-white mb-4">
          User Information
        </h3>
        <p className="text-gray-200">
          <strong className="font-medium text-yellow-300">Name:</strong>{" "}
          {booking.booking.user.firstName} {booking.booking.user.lastName}
        </p>
        <p className="text-gray-200">
          <strong className="font-medium text-yellow-300">Email:</strong>{" "}
          {booking.booking.user.email}
        </p>
      </motion.div>

      <motion.div
        className="service-info bg-gray-800 p-6 rounded-lg shadow-xl mb-8"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h3 className="text-2xl font-semibold text-white mb-4">
          Service Information
        </h3>
        <p className="text-gray-200">
          <strong className="font-medium text-yellow-300">Service:</strong>{" "}
          {booking.booking.service.title}
        </p>
        <p className="text-gray-200">
          <strong className="font-medium text-yellow-300">Description:</strong>{" "}
          {booking.booking.service.description}
        </p>
        <p className="text-gray-200">
          <strong className="font-medium text-yellow-300">Hourly Rate:</strong>{" "}
          {booking.booking.service?.prichourlyRate} ETB
        </p>
        <p className="text-gray-200">
          <strong className="font-medium text-yellow-300">Location:</strong>{" "}
          {booking.booking.service.location.join(", ")}
        </p>

        <div className="amenities mt-4">
          <p className="text-yellow-300 font-medium">Amenities:</p>
          <ul className="list-inside list-circle ml-6 text-gray-200 space-y-2">
            {booking.booking.service.amenities.map(
              (amenity: string, index: number) => (
                <motion.li
                  key={index}
                  whileHover={{ scale: 1.1 }}
                  className="text-gray-200"
                >
                  {amenity}
                </motion.li>
              )
            )}
          </ul>
        </div>

        <div className="benefits mt-4">
          <p className="text-yellow-300 font-medium">Benefits:</p>
          <ul className="list-inside list-circle ml-6 text-gray-200 space-y-2">
            {booking.booking.service.benefits.map(
              (benefit: string, index: number) => (
                <motion.li
                  key={index}
                  whileHover={{ scale: 1.1 }}
                  className="text-gray-200"
                >
                  {benefit}
                </motion.li>
              )
            )}
          </ul>
        </div>

        {booking.booking.service.images.length > 0 && (
          <div className="images mt-4">
            <motion.img
              src={booking.booking.service.images[0]}
              alt={booking.booking.service.title}
              className="w-full h-auto rounded-lg shadow-lg transform transition-transform hover:scale-105"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            />
          </div>
        )}
      </motion.div>

      <motion.div
        className="booking-info bg-gray-800 p-6 rounded-lg shadow-xl mb-8"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h3 className="text-2xl font-semibold text-white mb-4">
          Booking Details
        </h3>
        <p className="text-gray-200">
          <strong className="font-medium text-yellow-300">Booking Date:</strong>{" "}
          {new Date(booking.booking.bookingDate).toLocaleDateString()}
        </p>
        <p className="text-gray-200">
          <strong className="font-medium text-yellow-300">Start Time:</strong>{" "}
          {booking.booking.startTime}
        </p>
        <p className="text-gray-200">
          <strong className="font-medium text-yellow-300">End Time:</strong>{" "}
          {booking.booking.endTime}
        </p>
        <p className="text-gray-200">
          <strong className="font-medium text-yellow-300">Duration:</strong>{" "}
          {booking.booking.duration} hours
        </p>
        <p className="text-gray-200">
          <strong className="font-medium text-yellow-300">Price:</strong> $
          {booking.booking.price}
        </p>
        <p className="text-gray-200">
          <strong className="font-medium text-yellow-300">Status:</strong>{" "}
          {booking.booking.status}
        </p>
      </motion.div>

      <motion.div
        className="action-buttons flex justify-center gap-8"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <button
          onClick={() => setOpenUpdateModal(true)}
          className="bg-yellow-500 text-white px-8 py-4 rounded-full hover:bg-yellow-600 transform transition duration-300 flex items-center gap-3"
          disabled={isLoading}
        >
          {isLoading ? (
            "Rescheduling..."
          ) : (
            <>
              <FaRegCalendarAlt size={20} className="animate-pulse" />{" "}
              <span>Reschedule Booking</span>
            </>
          )}
        </button>
        {/* rmeove delete button for already cannceledBooings */}
        {!(booking?.booking?.status === "cancelled") && (
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-8 py-4 rounded-full hover:bg-red-600 transform transition duration-300 flex items-center gap-3"
            disabled={isLoading}
          >
            {isLoading ? (
              "Deleting..."
            ) : (
              <>
                <FaTrashAlt size={20} className="animate-bounce" />{" "}
                <span>Delete Booking</span>
              </>
            )}
          </button>
        )}
        {opneUpdateModal && (
          <Modal
            title="Update Booking"
            onClose={() => setOpenUpdateModal(false)}
            isOpen={opneUpdateModal}
          >
            <UpdateBooking />
          </Modal>
        )}
      </motion.div>
    </motion.div>
  );
};

export default BookingDetail;

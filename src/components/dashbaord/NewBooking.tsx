import { useForm, Controller } from "react-hook-form";
import { motion } from "framer-motion";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useGetServices } from "../../hooks/services";
import { useCreateBooking } from "../../hooks/services";
import Modal from "../ui/Modal";

interface BookingForm {
  service: string;
  bookingDate: string;
  startTime: string;
  endTime: string;
}

const NewBookingForm = () => {
  const { data } = useGetServices();
  const { createBooking } = useCreateBooking();
  const location = useLocation();
  const { state } = location || {};
  const serviceId = state?.serviceId || null;
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  interface BookingDetails {
    booking: {
      service: {
        title: string;
      };
      bookingDate: string;
      startTime: string;
      endTime: string;
      price: number;
    };
  }

  const [bookingDetails, setBookingDetails] = useState<BookingDetails | null>(
    null
  );

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<BookingForm>({
    defaultValues: {
      service: serviceId || "", // Pre-fill if serviceId exists
      bookingDate: "",
      startTime: "",
      endTime: "",
    },
  });

  // Handle Form Submission
  const onSubmit = async (data: BookingForm) => {
    setIsLoading(true);

    try {
      const bookingData = {
        service: data.service,
        bookingDate: data.bookingDate,
        startTime: data.startTime,
        endTime: data.endTime,
      };

      const res = await createBooking(bookingData, {
        onSuccess: () => {
          reset();
        },
      });
      console.log("Booking created successfully:", res);
      setBookingDetails(res as BookingDetails);

      setIsSubmitted(true);
    } catch (err: unknown) {
      console.error("Booking error:", err);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex flex-col justify-center items-center ">
      {/* Heading */}
      <motion.h1
        className="text-4xl font-bold text-gray-700 mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Book Your Space
      </motion.h1>

      {/* Form Card */}
      <motion.form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-lg bg-white p-8 rounded-2xl shadow-lg space-y-6"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Space Type */}
        <div>
          <label className="block text-sm font-medium mb-2">Space Type</label>
          <Controller
            name="service"
            control={control}
            rules={{ required: "Please select a space type." }}
            render={({ field }) => (
              <select
                {...field}
                className={`w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  errors.service ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="" disabled>
                  Select a space type
                </option>
                {data?.data?.map((service: { _id: string; title: string }) => (
                  <option key={service._id} value={service._id}>
                    {service.title}
                  </option>
                ))}
              </select>
            )}
          />
          {errors.service && (
            <p className="text-sm text-red-500 mt-1">
              {errors.service.message}
            </p>
          )}
        </div>

        {/* Date */}
        <div>
          <label className="block text-sm font-medium mb-2">Date</label>
          <Controller
            name="bookingDate"
            control={control}
            rules={{ required: "Please select a bookingDate." }}
            render={({ field }) => (
              <input
                {...field}
                type="date"
                className={`w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  errors.bookingDate ? "border-red-500" : "border-gray-300"
                }`}
              />
            )}
          />
          {errors.bookingDate && (
            <p className="text-sm text-red-500 mt-1">
              {errors.bookingDate.message}
            </p>
          )}
        </div>

        {/* Time */}
        <div className=" flex gap-6 justify-between">
          {/* start time */}
          <div>
            <label className="block text-sm font-medium mb-2">Start Time</label>
            <Controller
              name="startTime"
              control={control}
              rules={{ required: "Please select a time." }}
              render={({ field }) => (
                <input
                  {...field}
                  type="time"
                  className={`w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                    errors.startTime ? "border-red-500" : "border-gray-300"
                  }`}
                />
              )}
            />
            {errors.startTime && (
              <p className="text-sm text-red-500 mt-1">
                {errors.startTime.message}
              </p>
            )}
          </div>
          {/* end time */}
          <div>
            <label className="block text-sm font-medium mb-2">end Time</label>
            <Controller
              name="endTime"
              control={control}
              rules={{ required: "Please select a time." }}
              render={({ field }) => (
                <input
                  {...field}
                  type="time"
                  className={`w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                    errors.endTime ? "border-red-500" : "border-gray-300"
                  }`}
                />
              )}
            />
            {errors.endTime && (
              <p className="text-sm text-red-500 mt-1">
                {errors.endTime.message}
              </p>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          className="w-full py-3 rounded-lg bg-indigo-500 text-white font-semibold hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={isLoading}
        >
          {isLoading ? "Submitting..." : "Book Now"}
        </motion.button>
      </motion.form>
      {/* Success Message */}
      {isSubmitted && (
        <Modal
          isOpen={isSubmitted && bookingDetails !== null}
          onClose={() => setIsSubmitted(false)}
          title="Booking Confirmation"
        >
          <div className="text-gray-700">
            <p className="mb-4">Your booking has been created successfully!</p>
            <div>
              <h3 className="font-bold text-lg mb-2">Booking Details:</h3>
              <p>
                <strong>Service:</strong>{" "}
                {bookingDetails?.booking.service?.title}
              </p>
              <p>
                <strong>Booking Date:</strong>{" "}
                {new Date(
                  bookingDetails?.booking.bookingDate || ""
                ).toLocaleDateString()}
              </p>
              <p>
                <strong>Start Time:</strong> {bookingDetails?.booking.startTime}
              </p>
              <p>
                <strong>End Time:</strong> {bookingDetails?.booking.endTime}
              </p>
              <p>
                <strong>Price:</strong> ${bookingDetails?.booking?.price}
              </p>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default NewBookingForm;

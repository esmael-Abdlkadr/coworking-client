import { useForm, Controller } from "react-hook-form";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGetBooking, useUpdateBooking } from "../../hooks/services";
import ConfirmationModal from "../ConfirmationModal";

interface BookingForm {
  bookingDate: string;
  startTime: string;
  endTime: string;
}

interface Booking {
  bookingDate: string;
  startTime: string;
  endTime: string;
}

interface BookingResponse {
  booking: Booking;
}

function UpdateBooking() {
  const { id } = useParams();
  const { booking } = useGetBooking(id ? parseInt(id) : 0) as { booking: BookingResponse };
  const { updateBooking } = useUpdateBooking(id ? parseInt(id) : 0);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [bookingDetails, setBookingDetails] = useState<BookingForm | null>(null);
  console.log("Booking:", booking);
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<BookingForm>({
    defaultValues: {
      bookingDate: "",
      startTime: "",
      endTime: "",
    },
  });

  useEffect(() => {
    if (booking) {
      reset({
        bookingDate: booking.booking.bookingDate.split("T")[0], // Format the date correctly
        startTime: booking.booking.startTime, // Ensure this is in AM/PM format
        endTime: booking.booking.endTime, // Ensure this is in AM/PM format
      });
    }
  }, [booking, reset]);

  const onSubmit = async (data: BookingForm) => {
    setIsLoading(true);

    try {
      const bookingData = {
        bookingDate: data.bookingDate,
        startTime: data.startTime,
        endTime: data.endTime,
      };

      const res = await updateBooking(bookingData);
      console.log("Booking updated successfully:", res);
      setBookingDetails(res as BookingForm);

      setIsSubmitted(true);
    } catch (err: unknown) {
      console.error("Booking error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <motion.form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-lg bg-white p-8 rounded-2xl shadow-lg space-y-6"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div>
          <label className="block text-sm font-medium mb-2">Date</label>
          <Controller
            name="bookingDate"
            control={control}
            rules={{ required: "Please select a booking date." }}
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

        <div className="flex gap-6 justify-between">
          <div>
            <label className="block text-sm font-medium mb-2">Start Time</label>
            <Controller
              name="startTime"
              control={control}
              rules={{ required: "Please select a start time." }}
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

          <div>
            <label className="block text-sm font-medium mb-2">End Time</label>
            <Controller
              name="endTime"
              control={control}
              rules={{ required: "Please select an end time." }}
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

        <motion.button
          type="submit"
          className="w-full py-3 rounded-lg bg-indigo-500 text-white font-semibold hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={isLoading}
        >
          {isLoading ? "Submitting..." : "Update Booking"}
        </motion.button>
      </motion.form>

      {isSubmitted && (
        <ConfirmationModal
          isOpen={isSubmitted && bookingDetails !== null}
          onClose={() => setIsSubmitted(false)}
          title="Booking Update Confirmation"
          message="Your booking has been updated successfully!"
          details={bookingDetails}
        />
      )}
    </div>
  );
}

export default UpdateBooking;

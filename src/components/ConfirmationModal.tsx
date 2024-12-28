import React from "react";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  details: any;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  title,
  message,
  details,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <p className="mb-4">{message}</p>
        <div className="text-gray-700">
          <h3 className="font-bold text-lg mb-2">Booking Details:</h3>
          <p>
            <strong>Service:</strong> {details?.booking.service?.title}
          </p>
          <p>
            <strong>Booking Date:</strong>{" "}
            {new Date(details?.booking.bookingDate).toLocaleDateString()}
          </p>
          <p>
            <strong>Start Time:</strong> {details?.booking.startTime}
          </p>
          <p>
            <strong>End Time:</strong> {details?.booking.endTime}
          </p>
          <p>
            <strong>Price:</strong> ${details?.booking?.price}
          </p>
        </div>
        <button
          onClick={onClose}
          className="mt-4 w-full py-2 rounded-lg bg-indigo-500 text-white font-semibold hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ConfirmationModal;

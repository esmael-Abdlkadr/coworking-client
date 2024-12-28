import toast from "react-hot-toast";

export const handleError = (error: any) => {
  // Check if the status code is 429 and send a custom message
  if (error?.response?.status === 429) {
    const customMessage = "Too many requests. Please try again later.";
    toast.error(customMessage);
    return customMessage;
  }

  const message =
    error?.response?.data?.message || "An unexpected error occurred";
  toast.error(message);
  return message;
};

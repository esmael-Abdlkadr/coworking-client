import toast from "react-hot-toast";

const shownErrors = new Map<string, number>();
const ERROR_TIMEOUT = 5000; // 5 seconds cooldown between same errors
const GENERIC_ERROR_TIMEOUT = 3000; // 3 seconds cooldown for generic errors
const NETWORK_ERROR_TIMEOUT = 15000; // 15 seconds cooldown for network errors

// Track ongoing network errors
let hasActiveNetworkError = false;
let networkErrorTimeout: NodeJS.Timeout | null = null;
let lastNetworkErrorTime = 0;
const clearNetworkError = () => {
  hasActiveNetworkError = false;
  if (networkErrorTimeout) {
    clearTimeout(networkErrorTimeout);
    networkErrorTimeout = null;
  }
};
export const handleError = (error: any) => {
  const now = Date.now();
  
  // Clean up old errors
  for (const [key, timestamp] of shownErrors.entries()) {
    if (now - timestamp > ERROR_TIMEOUT) {
      shownErrors.delete(key);
    }
  }

  // Special handling for network errors with improved debouncing
  if (error?.message === 'Network Error' || !error?.response) {
    if (hasActiveNetworkError && (now - lastNetworkErrorTime) < NETWORK_ERROR_TIMEOUT) {
      return 'Network error occurred';
    }

    hasActiveNetworkError = true;
    lastNetworkErrorTime = now;
    
    if (networkErrorTimeout) {
      clearTimeout(networkErrorTimeout);
    }
    networkErrorTimeout = setTimeout(clearNetworkError, NETWORK_ERROR_TIMEOUT);

    const toastId: string = 'network-error-' + now;
    toast.error('Unable to connect to server. Please check your connection.', {
      duration: NETWORK_ERROR_TIMEOUT,
      icon: '📡',
      id: toastId
    });
    return 'Network error occurred';
  }

  // Get error message and key
  let message = "An unexpected error occurred";
  let errorKey = "generic";
  let duration = 4000;
  let icon: string | undefined = undefined;

  if (error?.response?.status === 429) {
    message = "Too many requests. Please try again later.";
    errorKey = "rate-limit";
    duration = 7000;
    icon = '⏳';
  } else if (error?.response?.status === 401) {
    message = error.response.data.message || "Authentication required";
    errorKey = "auth";
    duration = 5000;
    icon = '🔒';
  } else if (error?.response?.status >= 500) {
    message = "Server error. Please try again later.";
    errorKey = "server";
    duration = 5000;
    icon = '🔧';
  } else if (error?.response?.data?.message) {
    message = error.response.data.message;
    errorKey = `custom-${error?.response?.status || 'unknown'}`;
  }

  // Check if this error was recently shown
  if (shownErrors.has(errorKey) && (now - shownErrors.get(errorKey)!) < ERROR_TIMEOUT) {
    return message;
  }

  // Update the timestamp for this error
  shownErrors.set(errorKey, now);

  // Show the error toast with a unique ID to prevent duplicates
  toast.error(message, {
    duration,
    icon,
    id: `${errorKey}-${now}`
  });

  return message;
};

// Helper to determine if an error should be shown to user
export const shouldShowError = (error: any): boolean => {
  // Don't show canceled request errors
  if (error?.name === 'CanceledError') return false;
  
  // Don't show network errors if they're just from page navigation
  if (error?.name === 'AbortError') return false;

  // Don't show errors that are just from component unmounting
  if (error?.message?.includes('unmounted')) return false;

  // Don't show errors that are due to the component being unmounted
  if (error?.message?.includes('canceled')) return false;

  return true;
};

import { AxiosError } from "axios";
import instance from "../API/axiosConfig";
import { handleError } from "./errorHandler";

// interface APIResponse<T> {
//   status: string;
//   data: T;
// }

const apiCall = async <T>(
  url: string,
  data: Record<string, unknown> = {},
  method: "POST" | "GET" | "PATCH" | "DELETE" = "POST"
): Promise<T> => {
  try {
    const response = await instance({
      url,
      method,
      data,
      headers: { "Content-Type": "application/json" },
    });
    // Handle both wrapped and unwrapped responses
    return response.data as T;
  } catch (err) {
    console.log("API call error:", err);
    console.log("Error details:", {
      status: (err as AxiosError)?.response?.status,
      data: (err as AxiosError)?.response?.data,
    });
    if (err instanceof AxiosError && err.response?.status === 401) {
      // Let the axios interceptor handle 401 errors
      throw err;
    }
    handleError(err);
    throw err;
  }
};

export default apiCall;

import instance from "../API/axiosConfig";
import { handleError } from "./errorHandler";

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
    return response.data;
  } catch (err: any) {
    handleError(err);
    throw err;
  }
};

export default apiCall;

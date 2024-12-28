import apiCall from "../../utils/apiHelper";
import showToast from "../../utils/toastHelper";
import { API_ENDPOINTS } from "../apiEndpoints";
// interface UserData {
//   firstName: string;
//   lastName: string;
//   email: string;
// }
const updateMe = async (data: Record<string, unknown>) => {
  try {
    const response = await apiCall(API_ENDPOINTS.UPDATE_ME, data, "PATCH");
    showToast("Profile updated successfully", "success");
    return response;
  } catch (err: unknown) {
    console.error("updateMe error", err);
    throw err;
  }
};

export { updateMe };

import apiCall from "../../utils/apiHelper";
import { API_ENDPOINTS } from "../apiEndpoints";
import showToast from "../../utils/toastHelper";
import { RefreshTokenResponse } from "../../types/clientType";

interface AuthResponse {
  accessToken: string;
  user: {
    preferences: any;
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    permissions: string[];
    active: boolean;
    emailVerified: boolean;
    createdAt: string;
    updatedAt: string;
  };
}

interface SucessResponse {
  status: string;
  message: string;
}

interface OAuthLoginResponse extends AuthResponse {
  refreshToken?: string;
}

// interface SignUpData {
//   firstName: string;
//   lastName: string;
//   email: string;
//   password: string;
// }
const signup = async (data: Record<string, unknown>) => {
  try {
    const response = await apiCall<AuthResponse>(API_ENDPOINTS.SIGNUP, data);
    showToast("User account created successfully", "success");
    return response;
  } catch (err: unknown) {
    console.error("signup error", err);
    throw err;
  }
};

const login = async (data: Record<string, unknown>) => {
  try {
    const response = await apiCall<AuthResponse>(API_ENDPOINTS.LOGIN, data);
    showToast("Login successfully", "success");
    return response;
  } catch (err: unknown) {
    console.error("Login error", err);
    throw err;
  }
};

const googleLogin = async ({ accessToken }: { accessToken: string }): Promise<OAuthLoginResponse> => {
  try {
    // Redirect to the backend's Google auth endpoint
    window.location.href = `${import.meta.env.VITE_BASE_API_URL}/auth/google`;
    return Promise.resolve({} as OAuthLoginResponse);
  } catch (err: unknown) {
    console.error("Google login error:", err);
    if (err instanceof Error) {
      showToast(err.message, "error");
    } else {
      showToast("An error occurred during Google login", "error");
    }
    return Promise.reject(err);
  }
};

const githubLogin = async ({ accessToken }: { accessToken: string }): Promise<OAuthLoginResponse> => {
  try {
    // Redirect to the backend's GitHub auth endpoint
    window.location.href = `${import.meta.env.VITE_BASE_API_URL}/auth/github`;
    return Promise.resolve({} as OAuthLoginResponse);
  } catch (err: unknown) {
    console.error("GitHub login error:", err);
    if (err instanceof Error) {
      showToast(err.message, "error");
    } else {
      showToast("An error occurred during GitHub login", "error");
    }
    return Promise.reject(err);
  }
};

const logout = async () => {
  try {
    const response = await apiCall<SucessResponse>(API_ENDPOINTS.LOGOUT);
    showToast("Logout sucessfully", "success");
    return response;
  } catch (err: unknown) {
    console.error("Logout error", err);
    throw err;
  }
};

const forgotPassword = async (email: string) => {
  try {
    const response = await apiCall<SucessResponse>(
      API_ENDPOINTS.FOROGT_PASSWORD,
      { email }
    );
    showToast("Password reset link sent to your email", "success");
    return response;
  } catch (err: unknown) {
    console.error("forgot password error", err);
    throw err;
  }
};
const resetPassowrd = async (password: string, token: string) => {
  try {
    const response = await apiCall<SucessResponse>(
      `${API_ENDPOINTS.RESET_PASSWORD}/${token}`,
      { password }
    );
    showToast("Password reset sucessfully", "success");
    return response;
  } catch (err: unknown) {
    console.error("reset passowrd error", err);
    throw err;
  }
};

const verfiyOTP = async (email: string, otp: string) => {
  try {
    const response = await apiCall<SucessResponse>(API_ENDPOINTS.VERIFY_OTP, {
      email,
      otp,
    });
    showToast("OTP verified sucessfully", "success");
    return response;
  } catch (error) {
    console.error("Verify OTP error:", error);
    throw error;
  }
};

const requestNewOTP = async (email: string) => {
  try {
    const response = await apiCall<SucessResponse>(
      API_ENDPOINTS.REQUEST_NEW_OTP,
      {
        email,
      }
    );

    showToast("New OTP sent to your email", "success");
    return response;
  } catch (err: unknown) {
    console.log("err", err);
    throw err;
  }
};

const refreshAccessToken = async (): Promise<RefreshTokenResponse> => {
  try {
    const response = await apiCall<RefreshTokenResponse>(
      API_ENDPOINTS.REFRESH_ACCESS_TOKEN,
      {},
      "POST"
    );
    return response;
  } catch (err) {
    console.error("Refresh token error:", err);
    throw err;
  }
};

const ChangePassword = async (data: {
  currentPassword: string;
  newPassword: string;
}) => {
  try {
    const response = await apiCall(
      API_ENDPOINTS.CHANGE_PASSWORD,
      data,
      "PATCH"
    );
    showToast("Password changed successfully", "success");
    return response;
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("ChangePassword error", err.message);
    } else {
      console.error("ChangePassword error", err);
    }
    throw err;
  }
};

export {
  login,
  logout,
  googleLogin,
  githubLogin,
  forgotPassword,
  resetPassowrd,
  signup,
  verfiyOTP,
  requestNewOTP,
  refreshAccessToken,
  ChangePassword,
};

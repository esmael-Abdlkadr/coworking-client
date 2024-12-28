import axios from "axios";
import { refreshAccessToken } from "./services/authService";
let isRefreshing = false;
type FailedRequest = {
  resolve: (value?: unknown) => void;
  reject: (reason?: unknown) => void;
};

let failedQueue: FailedRequest[] = [];
const processQueue = (error: Error | null, token: string | null = null) => {
  failedQueue.forEach((promise: FailedRequest) => {
    if (error) promise.reject(error);
    else promise.resolve(token);
  });
  failedQueue = [];
};
console.log("failedQueue", failedQueue);

const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_URL,
  timeout: 10000,
  withCredentials: true,
});

// Request Interceptor to attach accessToken
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response Interceptor
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error?.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers["Authorization"] = `Bearer ${token}`;
            return axios(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }
      isRefreshing = true;
      try {
        const refeshToken = getCookies("refreshToken");
        if (!refeshToken) {
          window.location.href = "/auth?mode=signin";
          return Promise.reject(error);
        }
        const newAccessToken = await refreshAccessToken(refeshToken);
        localStorage.setItem("accessToken", newAccessToken.accessToken);
        processQueue(null, newAccessToken.accessToken);
        originalRequest.headers[
          "Authorization"
        ] = `Bearer ${newAccessToken.accessToken}`;
        return axios(originalRequest);
      } catch (err) {
        processQueue(err as Error, null);
        window.location.href = "/auth?mode=signin";
        return Promise.reject(error);
      } finally {
        isRefreshing = false;
      }
    }
    return Promise.reject(error);
  }
);

export default instance;

// fucntion to get cookies.
const getCookies = (name: string) => {
  const cookie = document.cookie;
  const allCookie = cookie.split(";");
  const fondCookie = allCookie.find((c) => c.includes(`${name}=`));
  return fondCookie ? fondCookie.split("=")[1] : null;
};

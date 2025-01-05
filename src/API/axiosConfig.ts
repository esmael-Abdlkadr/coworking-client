import axios from "axios";
import { refreshAccessToken } from "./services/authService";
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: unknown) => void;
  reject: (reason?: unknown) => void;
}> = [];

const processQueue = (error: Error | null, token: string | null = null) => {
  failedQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve(token);
    }
  });
  failedQueue = [];
};

const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_URL,
  timeout: 30000, 
  withCredentials: true,
  headers: {
    'Cache-Control': 'no-cache',
    'Pragma': 'no-cache',
    'Expires': '0',
  }
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If the error is 401 and we haven't retried yet
    if (error?.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // If we're already refreshing, add to queue
      if (isRefreshing) {
        try {
          const token = await new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          });
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return instance(originalRequest);
        } catch (err) {
          return Promise.reject(err);
        }
      }

      isRefreshing = true;

      try {
        const { accessToken } = await refreshAccessToken();
        localStorage.setItem("accessToken", accessToken);
        
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        processQueue(null, accessToken);
        return instance(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError as Error, null);
        localStorage.removeItem("accessToken");
        window.location.href = "/auth?mode=signin";
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    // Add request retry interceptor
    const { config, message } = error;
    if (!config || !config.retry) {
      return Promise.reject(error);
    }
    
    // Set the retry count
    config.retryCount = config.retryCount || 0;
    
    // If we've retried too many times or it's not a network error, reject
    if (config.retryCount >= 3 || (message !== 'Network Error' && error?.response)) {
      return Promise.reject(error);
    }
    
    // Increase the retry count
    config.retryCount += 1;
    
    // Create a new promise to handle the retry
    const backoff = new Promise((resolve) => {
      setTimeout(() => resolve(null), 1000 * config.retryCount);
    });
    
    // Wait for the backoff then retry the request
    await backoff;
    return instance(config);
  }
);

export default instance;

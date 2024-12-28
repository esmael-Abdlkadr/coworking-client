import toast from "react-hot-toast";
import axios, { AxiosResponse } from "axios";
const API_BASE_URL =
  import.meta.env.VITE_BASE_API_URL || "http://localhost:5000/api";

const getBlogs = async () => {
  try {
    const response: AxiosResponse = await axios.get(`${API_BASE_URL}/blog`);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      toast.error(error.response.data.message);
    } else {
      toast.error("An error occurred. Please try again.");
    }
  }
};

const getBlogBySlug = async (slug: string) => {
  try {
    const response: AxiosResponse = await axios.get(
      `${API_BASE_URL}/blog/${slug}`
    );

    return response.data;
  } catch (error: any) {
    if (error.response) {
      toast.error(error.response.data.message);
    } else {
      toast.error("An error occurred. Please try again.");
    }
  }
};

const getServices = async () => {
  try {
    const response: AxiosResponse = await axios.get(`${API_BASE_URL}/service`);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      toast.error(error.response.data.message);
    } else {
      toast.error("An error occurred. Please try again.");
    }
  }
};

const getServiceBySlug = async (slug: string) => {
  console.log("Slug received in API call:", slug); // Debug the slug
  try {
    const response: AxiosResponse = await axios.get(
      `${API_BASE_URL}/Service/${slug}`
    );
    console.log("API response:", response.data); // Log the full response
    return response.data.service; // Adjust to return the `service` object directly
  } catch (error: any) {
    if (error.response) {
      console.error("Error response from server:", error.response.data);
      toast.error(error.response.data.message || "Failed to fetch service.");
    } else {
      console.error("Unexpected error:", error.message);
      toast.error("An error occurred. Please try again.");
    }
  }
};

const getGallries = async () => {
  try {
    const response: AxiosResponse = await axios.get(`${API_BASE_URL}/gallery`);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      toast.error(error.response.data.message);
    } else {
      toast.error("An error occurred. Please try again.");
    }
  }
};

const incrementViewCount = async (blogId: string) => {
  try {
    const response: AxiosResponse = await axios.put(
      `${API_BASE_URL}/blog/incrementView/${blogId}`
    );
    return response.data;
  } catch (error: any) {
    if (error.response) {
      toast.error(error.response.data.message);
    } else {
      toast.error("An error occurred. Please try again.");
    }
  }
};

export {
  getBlogs,
  getBlogBySlug,
  getServices,
  getServiceBySlug,
  getGallries,
  incrementViewCount,
};

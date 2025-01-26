import { API_ENDPOINTS } from "../apiEndpoints";
import apiCall from "../../utils/apiHelper";
// import showToast from "../../utils/toastHelper";

// interface BookingData {
//   service: string;
//   bookingDate: string;
//   startTime: string;
//   endTime: string;
// }
// interface updateBookingData {
//   bookingDate: string;
//   startTime: string;
//   endTime: string;
// }

const createBooking = async (data: Record<string, unknown>) => {
  try {
    const response = await apiCall(API_ENDPOINTS.BOOKING, data);
    return response;
  } catch (err: unknown) {
    console.error("Booking error", err);
    throw err;
  }
};
const getBookings = async (filters: {
  page: number;
  limit: number;
  status: string;
  sortField: string;
  sortDirection: string;
  userId?: string;
}) => {
  try {
    // cosnruct query string from filters
    const queryParam = new URLSearchParams(filters as any).toString();
    const response = await apiCall(
      `${API_ENDPOINTS.BOOKING}?${queryParam}`,
      {},
      "GET"
    );
    return response;
  } catch (err: unknown) {
    console.error("Booking error", err);
    throw err;
  }
};
const getBooking = async (id: number) => {
  try {
    const response = await apiCall(`${API_ENDPOINTS.BOOKING}/${id}`, {}, "GET");
    return response;
  } catch (err: unknown) {
    console.error("Booking error", err);
    throw err;
  }
};

const updateBooking = async (id: number, data: Record<string, unknown>) => {
  try {
    const response = await apiCall(
      `${API_ENDPOINTS.BOOKING}/${id}`,
      data,
      "PATCH"
    );
    return response;
  } catch (err: unknown) {
    console.error("Booking error", err);
    throw err;
  }
};
const cancelBooking = async (id: number) => {
  try {
    const response = await apiCall(
      `${API_ENDPOINTS.BOOKING}/cancel/${id}`,
      {},
      "PATCH"
    );
    return response;
  } catch (err: unknown) {
    console.error("Booking error", err);
    throw err;
  }
};

const getAllEvents = async () => {
  try {
    const response = await apiCall(API_ENDPOINTS.EVENT, {}, "GET");
    return response;
  } catch (err: unknown) {
    console.error("Booking error", err);
    throw err;
  }
};
const getEventById = async (id: string) => {
  try {
    const response = await apiCall(`${API_ENDPOINTS.EVENT}/${id}`, {}, "GET");
    return response;
  } catch (err: unknown) {
    console.error("Booking error", err);
    throw err;
  }
};

const reserveSpot = async ({
  eventId,
  waitlist = false,
}: {
  eventId: string;
  waitlist?: boolean;
}) => {
  try {
    const response = await apiCall(
      `${API_ENDPOINTS.RSRV}/reserve`,
      { eventId, waitlist },
      "POST"
    );
    return response;
  } catch (err: unknown) {
    console.error("RSRV error", err);
    throw err;
  }
};

const getMyReservations = async () => {
  try {
    const response = await apiCall(
      `${API_ENDPOINTS.RSRV}/reservations`,
      {},
      "GET"
    );
    return response;
  } catch (err: unknown) {
    console.error("RSRV error", err);
    throw err;
  }
};
const cancelResrve = async (id: string) => {
  try {
    const response = await apiCall(
      `${API_ENDPOINTS.RSRV}/cancel/${id}`,
      {},
      "PATCH"
    );
    return response;
  } catch (err: unknown) {
    console.error("RSRV error", err);
    throw err;
  }
};

const getAllReservations = async (filters: {
  page: number;
  limit: number;
  sortField: string;
  sortDirection: string;
  eventId?: string;
  status?: string;
}) => {
  try {
    const queryParam = new URLSearchParams(filters as any).toString();
    const response = await apiCall(
      `${API_ENDPOINTS.RSRV}/all-reservations?${queryParam}`,
      {},
      "GET"
    );
    return response;
  } catch (err: unknown) {
    console.error("RSRV error", err);
    throw err;
  }
};

// comments.
const getAllComments = async () => {
  try {
    const response = await apiCall(API_ENDPOINTS.COMMENT, {}, "GET");
    return response;
  } catch (err: unknown) {
    console.error("Comment error", err);
    throw err;
  }
};
const createComment = async ({
  blogId,
  content,
}: {
  blogId: string;
  content: string;
}) => {
  try {
    const response = await apiCall(`${API_ENDPOINTS.COMMENT}/${blogId}`, {
      content,
    });
    return response;
  } catch (err: unknown) {
    console.error("Comment error", err);
    throw err;
  }
};
const getCommentByBlogId = async (blogId: string) => {
  try {
    const response = await apiCall(
      `${API_ENDPOINTS.COMMENT}/${blogId}`,
      {},
      "GET"
    );
    return response;
  } catch (err: unknown) {
    console.error("Comment error", err);
    throw err;
  }
};
const updateComment = async (id: string, content: string) => {
  try {
    console.log("id", id);

    const response = await apiCall(
      `${API_ENDPOINTS.COMMENT}/${id}`,
      {
        content,
      },
      "PATCH"
    );
    return response;
  } catch (err: unknown) {
    console.error("Comment error", err);
    throw err;
  }
};
const deleteComment = async (id: string) => {
  try {
    const response = await apiCall(
      `${API_ENDPOINTS.COMMENT}/${id}`,
      {},
      "DELETE"
    );
    return response;
  } catch (err: unknown) {
    console.error("Comment error", err);
    throw err;
  }
};
const addLike = async (blogId: string) => {
  try {
    const response = await apiCall(`${API_ENDPOINTS.LIKE}?blogId=${blogId}`);
    return response;
  } catch (err: unknown) {
    console.error("Like error", err);
    throw err;
  }
};
const addDisLike = async (blogId: string) => {
  try {
    const response = await apiCall(
      `${API_ENDPOINTS.LIKE}/dislike/?blogId=${blogId}`
    );
    return response;
  } catch (err: unknown) {
    console.error("DisLike error", err);
    throw err;
  }
};

const removeReaction = async (blogId: string, type: string) => {
  console.log("type", type);
  try {
    const response = await apiCall(
      `${API_ENDPOINTS.LIKE}/${blogId}?type=${type}`,
      {},
      "DELETE"
    );
    return response;
  } catch (err: unknown) {
    console.error("Remove reaction error", err);
    throw err;
  }
};

const commentReaction = async (commentId: string, type: string) => {
  try {
    const response = await apiCall(
      `${API_ENDPOINTS.LIKE}/comment/${commentId}?type=${type}`
    );
    return response;
  } catch (err: unknown) {
    console.error("Comment reaction error", err);
    throw err;
  }
};
const getUserReactionOnBlog = async (blogId: string) => {
  try {
    const response = await apiCall(
      `${API_ENDPOINTS.LIKE}/blog/${blogId}/user-reaction`,
      {},
      "GET"
    );
    return response;
  } catch (err: unknown) {
    console.error("Get user reaction error", err);
    throw err;
  }
};

const getReactionsForBlog = async (blogId: string) => {
  try {
    const response = await apiCall(
      `${API_ENDPOINTS.LIKE}/blog/${blogId}/reactions`,
      {},
      "GET"
    );
    return response;
  } catch (err: unknown) {
    console.error("Get reactions for blog error", err);
    throw err;
  }
};

const addReply = async ({
  commentId,
  content,
}: {
  commentId: string;
  content: string;
}) => {
  try {
    const response = await apiCall(
      `${API_ENDPOINTS.COMMENT}/${commentId}/replies`,
      { content },
      "POST"
    );
    return response;
  } catch (err: unknown) {
    console.error("Reply error", err);
    throw err;
  }
};

const getTotalCommentsForBlog = async (blogId: string) => {
  try {
    const response = await apiCall(
      `${API_ENDPOINTS.COMMENT}/totalComments/${blogId}`,
      {},
      "GET"
    );
    return response;
  } catch (err: unknown) {
    console.error("Failed to fetch total comments", err);
    throw err;
  }
};
const getAllCategoies = async () => {
  try {
    const response = await apiCall(`${API_ENDPOINTS.CATEGORY}`, {}, "GET");
    return response;
  } catch (err: unknown) {
    console.error("Failed to fetch total comments", err);
    throw err;
  }
};
const getCategoryById = async (id: string) => {
  try {
    const response = await apiCall(
      `${API_ENDPOINTS.CATEGORY}/${id}`,
      {},
      "GET"
    );
    return response;
  } catch (err: unknown) {
    console.error("Failed to fetch total comments", err);
    throw err;
  }
};

// BLOGS.
const getRecentBlgs = async (limit: number) => {
  try {
    const response = await apiCall(
      `${API_ENDPOINTS.BLOG}/recent?${limit}`,
      {},
      "GET"
    );
    return response;
  } catch (err: unknown) {
    console.error("Blog error", err);
    throw err;
  }
};
const bookmarkBlog = async (blogId: string) => {
  try {
    console.log("blogId", blogId);
    const response = await apiCall(
      `${API_ENDPOINTS.BLOG}/bookmark/${blogId}`,
      {},
      "POST"
    );
    console.log("response", response);
    return response;
  } catch (err: unknown) {
    console.error("Blog error", err);
    throw err;
  }
};
const getBookmarkStatus = async (blogId: string) => {
  try {
    const response = await apiCall(
      `${API_ENDPOINTS.BLOG}/bookmark/${blogId}`,
      {},
      "GET"
    );
    console.log("response---bookmark", response);
    return response;
  } catch (err: unknown) {
    console.error("Blog error", err);
    throw err;
  }
};
const getBookmarkedBlogs = async () => {
  try {
    const response = await apiCall(
      `${API_ENDPOINTS.BLOG}/bookmarked`,
      {},
      "GET"
    );
    return response;
  } catch (err: unknown) {
    console.error("Blog error", err);
    throw err;
  }
};
export {
  createBooking,
  getBookings,
  getBooking,
  cancelBooking,
  updateBooking,
  getRecentBlgs,
  getEventById,
  reserveSpot,
  getMyReservations,
  cancelResrve,
  getAllReservations,
  getAllComments,
  getCommentByBlogId,
  createComment,
  updateComment,
  deleteComment,
  addLike,
  addDisLike,
  removeReaction,
  getUserReactionOnBlog,
  getReactionsForBlog,
  commentReaction,
  addReply,
  getTotalCommentsForBlog,
  getAllCategoies,
  getCategoryById,
  getAllEvents,
  bookmarkBlog,
  getBookmarkStatus,
  getBookmarkedBlogs,
};

import { keepPreviousData, useQueryClient } from "@tanstack/react-query";
import {
  getBlogBySlug,
  getBlogs,
  getGallries,
  getServiceBySlug,
  getServices,
  incrementViewCount,
} from "../API/blogs";
import {
  createComment,
  deleteComment,
  getAllEvents,
  getCommentByBlogId,
  getEventById,
  updateComment,
  getTotalCommentsForBlog,
  getAllCategoies,
  getCategoryById,
  getRecentBlgs,
  bookmarkBlog,
  getBookmarkStatus,
  getBookmarkedBlogs,
} from "../API/services/APiServices";
import {
  cancelBooking,
  cancelResrve,
  createBooking,
  getBooking,
  getBookings,
  getMyReservations,
  reserveSpot,
  updateBooking,
  getAllReservations,
  addLike,
  removeReaction,
  addDisLike,
  getUserReactionOnBlog,
  getReactionsForBlog,
  commentReaction,
  addReply,
} from "../API/services/APiServices";
import { useTrackedMutation, useTrackedQuery } from "../utils/sentryUtil";
import { BlogQueryParams } from "../types/clientType";
const useGetBlogs = (params?: BlogQueryParams) => {
  const { data, isError, isLoading } = useTrackedQuery(
    ["blogs", JSON.stringify(params)],
    () => getBlogs(params),
    {
      keepPreviousData: true,
    }
  );
  return { blogs: data, isError, isLoading };
};

const useGetBlogBySlug = (slug: string) => {
  const { data, isError, isLoading } = useTrackedQuery(
    ["blog", slug],
    () => getBlogBySlug(slug),
    { enabled: !!slug }
  );

  return { blog: data, isError, isLoading };
};

const useGetServices = () => {
  const { data, isLoading, isError } = useTrackedQuery(
    ["getServices"],
    getServices
  );
  return { data, isLoading, isError };
};

const useGetServiceBySlug = (slug: string) => {
  const { data, isLoading, isError } = useTrackedQuery(
    ["getServiceBySlug", slug],
    () => getServiceBySlug(slug),
    { enabled: !!slug }
  );
  return { service: data, isLoading, isError };
};
const useGetRecentBlogs = (limit: number) => {
  const { data, isError, isLoading } = useTrackedQuery(
    ["recentBlogs", limit.toString()],
    () => getRecentBlgs(limit)
    // { enabled: !!limit }
  );
  return { recentBlogs: data, isError, isLoading };
};
const useBookmarkBlog = () => {
  const { mutateAsync, isError } = useTrackedMutation((blogId: string) =>
    bookmarkBlog(blogId)
  );
  return { bookmarkBlog: mutateAsync, isError };
};
const useGetBookmarkStatus = (blogId: string) => {
  const { data, isError, isLoading } = useTrackedQuery(
    ["bookmark", blogId],
    () => getBookmarkStatus(blogId),
    { enabled: !!blogId }
  );

  return { bookmarkStatus: data, isError, isLoading };
};
const useGetBookmarkedBlogs = () => {
  const { data, isError, isLoading } = useTrackedQuery(
    ["bookmarkedBlogs"],
    getBookmarkedBlogs
  );
  return { bookmarkedBlogs: data?.data, isError, isLoading };
};
const useGetGallries = () => {
  const { data, isError } = useTrackedQuery(["galleries"], getGallries);
  return { galleries: data, isError };
};

const useGetAllEvents = () => {
  const { data, isLoading, isError } = useTrackedQuery(
    ["events"],
    getAllEvents
  );
  return { data, isLoading, isError };
};

const useGetEventById = (id: string) => {
  const { data, isLoading, isError } = useTrackedQuery(
    ["event", id],
    () => getEventById(id),
    { enabled: !!id }
  );

  return { event: data, isLoading, isError };
};

const useAddComment = () => {
  const { mutateAsync, isError, isPending } = useTrackedMutation(
    ({ blogId, content }: { blogId: string; content: string }) =>
      createComment({ blogId, content })
  );
  return { addComment: mutateAsync, isError, isPending };
};

const useGetCommentByBlogId = (blogId: string) => {
  const { data, isError, isLoading } = useTrackedQuery(
    ["comments", blogId],
    () => getCommentByBlogId(blogId),
    { enabled: !!blogId }
  );
  return { comments: data, isError, isLoading };
};

const useEditComment = () => {
  const { mutateAsync, isError, isPending } = useTrackedMutation(
    ({ id, content }: { id: string; content: string }) =>
      updateComment(id, content)
  );
  return { editComment: mutateAsync, isError, isPending };
};

const useDeleteComment = () => {
  const { mutateAsync, isError, isPending } = useTrackedMutation((id: string) =>
    deleteComment(id)
  );
  return { deleteComment: mutateAsync, isError, isPending };
};

const useIncrementView = () => {
  const { mutateAsync } = useTrackedMutation((blogId: string) =>
    incrementViewCount(blogId)
  );
  return { incrementView: mutateAsync };
};

const useCreateBooking = () => {
  const { mutateAsync, isError } = useTrackedMutation(createBooking, {
    mutationKey: ["createBooking"],
    onSuccess: (data) => {
      console.log("Booking created successfully", data);
    },
  });
  return { createBooking: mutateAsync, isError };
};

const useGetAllBookings = (filters: {
  page: number;
  limit: number;
  status: string;
  sortField: string;
  sortDirection: string;
  userId?: string;
}) => {
  const { data, error, isLoading } = useTrackedQuery(
    ["bookings", JSON.stringify(filters)],
    () => getBookings(filters),
    {
      placeholderData: keepPreviousData, // Keep previous data while fetching new data
      staleTime: 10000,
    }
  );

  return {
    data,
    error,
    isLoading,
  };
};

const useGetBooking = (id: number) => {
  const { data, error, isLoading } = useTrackedQuery(
    ["booking", id.toString()],
    () => getBooking(id),
    { enabled: !!id }
  );

  return {
    booking: data,
    error,
    loader: isLoading,
  };
};

const useUpdateBooking = (id: number) => {
  const queryClient = useQueryClient();
  const { mutateAsync, isError, isPending } = useTrackedMutation(
    (data: Record<string, unknown>) => updateBooking(id, data),
    {
      mutationKey: ["updateBooking"],
      onSuccess: (data) => {
        console.log("Booking updated successfully", data);
        queryClient.invalidateQueries({ queryKey: ["booking", id] });
      },
    }
  );
  return { updateBooking: mutateAsync, isError, isPending };
};

const useCancelBooking = (id: number) => {
  const { mutateAsync, isError } = useTrackedMutation(() => cancelBooking(id), {
    mutationKey: ["cancelBooking"],
    onSuccess: (data) => {
      console.log("Booking cancelled successfully", data);
    },
  });
  return { cancelBooking: mutateAsync, isError };
};

const useReserveSpot = () => {
  const { mutateAsync, isError } = useTrackedMutation(reserveSpot, {
    mutationKey: ["reserveSpot"],
    onError: (error) => {
      console.error("Event Reserve error", error);
    },
  });
  return { reserveSpot: mutateAsync, isError };
};

const useGetReservations = () => {
  const { data, isLoading, isError } = useTrackedQuery(
    ["getReservations"],
    getMyReservations
  );
  return { data, isLoading, isError };
};

const useCancelReservation = () => {
  const queryClient = useQueryClient();
  const { mutateAsync, isError, isPending } = useTrackedMutation(
    (reservationId: string) => cancelResrve(reservationId),
    {
      mutationKey: ["cancelReservation"],
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["getReservations"] });
      },
    }
  );
  return { cancelReservation: mutateAsync, isError, isPending };
};

const useGetAllReservations = (filters: {
  page: number;
  limit: number;
  sortField: string;
  sortDirection: string;
  eventId?: string;
  status?: string;
}) => {
  const { data, isLoading, isError } = useTrackedQuery(
    ["getAllReservations", JSON.stringify(filters)],
    () => getAllReservations(filters)
  );
  return { data, isLoading, isError };
};

const useAddLike = () => {
  const { mutateAsync, isError } = useTrackedMutation(addLike, {
    mutationKey: ["addLike"],
    onSuccess: (data) => {
      console.log("Like added successfully", data);
    },
  });
  return { addLike: mutateAsync, isError };
};

const useAddDislike = () => {
  const { mutateAsync, isError } = useTrackedMutation(addDisLike, {
    mutationKey: ["addDislike"],
    onSuccess: (data) => {
      console.log("Dislike added successfully", data);
    },
  });
  return { addDislike: mutateAsync, isError };
};

const useRemoveReaction = () => {
  const { mutateAsync, isError } = useTrackedMutation(
    ({ blogId, type }: { blogId: string; type: string }) =>
      removeReaction(blogId, type),
    {
      mutationKey: ["removeReaction"],
      onSuccess: (data) => {
        console.log("Reaction removed successfully", data);
      },
    }
  );
  return { removeReaction: mutateAsync, isError };
};

const useGetUserReactionOnBlog = (blogId: string) => {
  const { data, error, isLoading } = useTrackedQuery(
    ["userReaction", blogId],
    () => getUserReactionOnBlog(blogId),
    { enabled: !!blogId }
  );

  return {
    userReaction: data,
    error,
    isLoading,
  };
};

const useGetReactionsForBlog = (blogId: string) => {
  const { data, error, isLoading } = useTrackedQuery(
    ["reactionsForBlog", blogId],
    () => getReactionsForBlog(blogId),
    { enabled: !!blogId }
  );

  return {
    reactions: data,
    error,
    isLoading,
  };
};

const useCommentReaction = () => {
  const { mutateAsync, isError } = useTrackedMutation(
    ({ commentId, type }: { commentId: string; type: string }) =>
      commentReaction(commentId, type),
    {
      mutationKey: ["commentReaction"],
      onSuccess: (data) => {
        console.log("Comment reaction added successfully", data);
      },
    }
  );
  return { commentReaction: mutateAsync, isError };
};

const useAddReply = () => {
  const queryClient = useQueryClient();
  const { mutateAsync, isError, isPending } = useTrackedMutation(addReply, {
    mutationKey: ["addReply"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments"] });
    },
  });
  return { addReply: mutateAsync, isError, isPending };
};

const useGetTotalCommentsForBlog = (blogId: string) => {
  const { data, isError, isLoading } = useTrackedQuery(
    ["totalComments", blogId],
    () => getTotalCommentsForBlog(blogId),
    { enabled: !!blogId }
  );
  return { totalComments: data, isError, isLoading };
};
const useGetAllCategories = () => {
  const { data, isLoading, isError } = useTrackedQuery(
    ["categories"],
    getAllCategoies
  );
  return { data, isLoading, isError };
};
const useGetCategoryById = (id: string) => {
  const { data, isLoading, isError } = useTrackedQuery(
    ["category", id],
    () => getCategoryById(id),
    { enabled: !!id }
  );
  return { data, isLoading, isError };
};
export {
  useGetBlogs,
  useGetBlogBySlug,
  useGetServices,
  useGetServiceBySlug,
  useGetRecentBlogs,
  useBookmarkBlog,
  useGetBookmarkStatus,
  useGetBookmarkedBlogs,
  useGetGallries,
  useGetAllEvents,
  useGetEventById,
  useAddComment,
  useGetCommentByBlogId,
  useEditComment,
  useDeleteComment,
  useIncrementView,
  useCreateBooking,
  useGetAllBookings,
  useGetBooking,
  useCancelBooking,
  useUpdateBooking,
  useReserveSpot,
  useCancelReservation,
  useGetReservations,
  useGetAllReservations,
  useAddLike,
  useAddDislike,
  useRemoveReaction,
  useGetUserReactionOnBlog,
  useGetReactionsForBlog,
  useCommentReaction,
  useAddReply,
  useGetTotalCommentsForBlog,
  useGetAllCategories,
  useGetCategoryById,
};

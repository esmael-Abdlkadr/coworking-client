import {
  useMutation,
  useQuery,
  keepPreviousData,
  useQueryClient,
} from "@tanstack/react-query";
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

const useGetBlogs = () => {
  const { data, isError } = useQuery({
    queryKey: ["blogs"],
    queryFn: getBlogs,
  });
  return { blogs: data, isError };
};
const useGetBlogBySlug = (slug: string) => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["blog", slug],
    queryFn: () => getBlogBySlug(slug),

    enabled: !!slug, // fetch only if slug is available
  });

  return { blog: data, isError, isLoading };
};

const useGetServices = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["getServices"],
    queryFn: () => getServices(),
  });
  return { data, isLoading, isError };
};

const useGetServiceBySlug = (slug: string) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["getServiceBySlug", slug],
    queryFn: () => getServiceBySlug(slug),
    enabled: !!slug,
  });

  console.log("Slug:", slug);
  console.log("Hook data:", data);
  return { service: data, isLoading, isError };
};

const useGetGallries = () => {
  const { data, isError } = useQuery({
    queryKey: ["galleries"],
    queryFn: getGallries,
  });
  return { galleries: data, isError };
};

const useGetAllEvents = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["events"],
    queryFn: getAllEvents,
  });
  return { data, isLoading, isError };
};
const useGetEventById = (id: string) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["event", id],
    queryFn: () => getEventById(id),
    enabled: !!id,
  });

  return { event: data, isLoading, isError };
};
const useAddComment = () => {
  const { mutateAsync, isError, isPending } = useMutation({
    mutationFn: ({ blogId, content }: { blogId: string; content: string }) =>
      createComment({ blogId, content }),
  });
  return { addComment: mutateAsync, isError, isPending };
};
const useGetCommentByBlogId = (blogId: string) => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["comments", blogId],
    queryFn: () => getCommentByBlogId(blogId),
    enabled: !!blogId,
  });
  return { comments: data, isError, isLoading };
};
const useEditComment = () => {
  const { mutateAsync, isError, isPending } = useMutation({
    mutationFn: ({ id, content }: { id: string; content: string }) =>
      updateComment(id, content),
  });
  return { editComment: mutateAsync, isError, isPending };
};
const useDeleteComment = () => {
  const { mutateAsync, isError, isPending } = useMutation({
    mutationFn: (id: string) => deleteComment(id),
  });
  return { deleteComment: mutateAsync, isError, isPending };
};

const useIncrementView = () => {
  const { mutateAsync } = useMutation({
    mutationFn: (blogId: string) => incrementViewCount(blogId),
  });
  return { incrementView: mutateAsync };
};
const useCreateBooking = () => {
  const { mutateAsync, isError } = useMutation({
    mutationFn: createBooking,
    mutationKey: ["createBooking"],
    onError: (error) => {
      console.error("Booking error", error);
    },
    onSuccess: (data) => {
      console.log("Booking created sucessfully", data);
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
  const { data, error, isLoading } = useQuery({
    queryKey: ["bookings", filters],
    queryFn: () => getBookings(filters),
    placeholderData: keepPreviousData, // Keep previous data while fetching new data
    staleTime: 10000,
  });

  return {
    data,
    error,
    isLoading,
  };
};
const useGetBooking = (id: number) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["booking", id],
    queryFn: () => getBooking(id),
    enabled: !!id,
  });

  return {
    booking: data,
    error,
    loader: isLoading,
  };
};

const useUpdateBooking = (id: number) => {
  const queryClient = useQueryClient();
  const { mutateAsync, isError, isPending } = useMutation({
    mutationFn: (data: Record<string, unknown>) => updateBooking(id, data),
    mutationKey: ["updateBooking"],
    onError: (error) => {
      console.error("Booking error", error);
    },
    onSuccess: (data) => {
      console.log("Booking updated sucessfully", data);
      queryClient.invalidateQueries({ queryKey: ["booking", id] });
    },
  });
  return { updateBooking: mutateAsync, isError, isPending };
};
const useCancelBooking = (id: number) => {
  const { mutateAsync, isError } = useMutation({
    mutationFn: () => cancelBooking(id),
    mutationKey: ["cancelBooking"],
    onError: (error) => {
      console.error("Booking error", error);
    },
    onSuccess: (data) => {
      console.log("Booking cancelled sucessfully", data);
    },
  });
  return { cancelBooking: mutateAsync, isError };
};

const useReserveSpot = () => {
  const { mutateAsync, isError } = useMutation({
    mutationFn: reserveSpot,
    mutationKey: ["reserveSpot"],
    onError: (error) => {
      console.error("Event Reserve error", error);
    },
  });
  return { reserveSpot: mutateAsync, isError };
};

const useGetReservations = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["getReservations"],
    queryFn: getMyReservations,
  });
  return { data, isLoading, isError };
};

const useCancelReservation = () => {
  const queryClient = useQueryClient();
  const { mutateAsync, isError, isPending } = useMutation({
    mutationFn: (reservationId: string) => cancelResrve(reservationId),
    mutationKey: ["cancelReservation"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getReservations"] });
    },
  });
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
  const { data, isLoading, isError } = useQuery({
    queryKey: ["getAllReservations", filters],
    queryFn: () => getAllReservations(filters),
  });
  return { data, isLoading, isError };
};

const useAddLike = () => {
  const { mutateAsync, isError } = useMutation({
    mutationFn: addLike,
    mutationKey: ["addLike"],
    onError: (error) => {
      console.error("Like error", error);
    },
    onSuccess: (data) => {
      console.log("Like added successfully", data);
    },
  });
  return { addLike: mutateAsync, isError };
};

const useAddDislike = () => {
  const { mutateAsync, isError } = useMutation({
    mutationFn: addDisLike,
    mutationKey: ["addDislike"],
    onError: (error) => {
      console.error("Dislike error", error);
    },
    onSuccess: (data) => {
      console.log("Dislike added successfully", data);
    },
  });
  return { addDislike: mutateAsync, isError };
};

const useRemoveReaction = () => {
  const { mutateAsync, isError } = useMutation({
    mutationFn: ({ blogId, type }: { blogId: string; type: string }) =>
      removeReaction(blogId, type),
    mutationKey: ["removeReaction"],
    onError: (error) => {
      console.error("Remove reaction error", error);
    },
    onSuccess: (data) => {
      console.log("Reaction removed successfully", data);
    },
  });
  return { removeReaction: mutateAsync, isError };
};

const useGetUserReactionOnBlog = (blogId: string) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["userReaction", blogId],
    queryFn: () => getUserReactionOnBlog(blogId),
    enabled: !!blogId,
  });

  return {
    userReaction: data,
    error,
    isLoading,
  };
};

const useGetReactionsForBlog = (blogId: string) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["reactionsForBlog", blogId],
    queryFn: () => getReactionsForBlog(blogId),
    enabled: !!blogId,
  });

  return {
    reactions: data,
    error,
    isLoading,
  };
};
const useCommentReaction = () => {
  const { mutateAsync, isError } = useMutation({
    mutationFn: ({ commentId, type }: { commentId: string; type: string }) =>
      commentReaction(commentId, type),
    mutationKey: ["commentReaction"],
    onError: (error) => {
      console.error("Comment reaction error", error);
    },
    onSuccess: (data) => {
      console.log("Comment reaction added successfully", data);
    },
  });
  return { commentReaction: mutateAsync, isError };
};

const useAddReply = () => {
  const queryClient = useQueryClient();
  const { mutateAsync, isError, isPending } = useMutation({
    mutationFn: addReply,
    mutationKey: ["addReply"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments"] });
    },
  });
  return { addReply: mutateAsync, isError, isPending };
};

const useGetTotalCommentsForBlog = (blogId: string) => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["totalComments", blogId],
    queryFn: () => getTotalCommentsForBlog(blogId),
    enabled: !!blogId,
  });
  return { totalComments: data, isError, isLoading };
};

export {
  useGetBlogs,
  useGetBlogBySlug,
  useGetServices,
  useGetServiceBySlug,
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
};

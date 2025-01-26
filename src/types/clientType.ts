export interface IFormInput {
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
}
export interface BlogCommentsProps {
  comments: Array<{
    id: string;
    user: {
      _id: string;
      firstName: string;
      lastName: string;
    };
    content: string;
    createdAt: string;
    reaction: string | null;
    likeCount: number;
    dislikeCount: number;
    replies: Array<{
      id: string;
      user: {
        _id: string;
        firstName: string;
        lastName: string;
      };
      content: string;
      createdAt: string;
      reaction: string | null;
      likeCount: number;
      dislikeCount: number;
    }>;
  }>;
  newComment: string;
  setNewComment: (comment: string) => void;
  handleAddComment: () => void;
  isAddingComment: boolean;
  editingCommentId: string | null;
  setEditingCommentId: (id: string | null) => void;
  editingCommentContent: string;
  setEditingCommentContent: (content: string) => void;
  handleEditComment: (id: string) => void;
  isEditingComment: boolean;
  handleDeleteComment: (id: string) => void;
  isDeletingComment: boolean;
  handleCommentReaction: (id: string, reaction: string) => void;
  replyingToCommentId: string | null;
  setReplyingToCommentId: (id: string | null) => void;
  replyContent: string;
  setReplyContent: (content: string) => void;
  handleAddReply: (id: string) => void;
  isAddingReply: boolean;
  commentsLoading: boolean;
  commentsError: boolean;
  loggedInUserId: string;
  handleReplyReaction: (id: string, reaction: string) => void;
  editingReplyId: string | null;
  setEditingReplyId: (id: string | null) => void;
  editingReplyContent: string;
  setEditingReplyContent: (content: string) => void;
  handleEditReply: (id: string) => void;
  isEditingReply: boolean;
  handleDeleteReply: (id: string) => void;
  isDeletingReply: boolean;
  blogId: string;
  totalComments: number;
}
export interface BlogProps {
  img: string;
  title: string;
  writerName: string;
  date: string;
  tags: string;
  route: string;
}
export interface Category {
  _id: string;
  name: string;
}
export interface BlogQueryParams {
  page?: number;
  limit?: number;
  sortField?: string;
  sortDirection?: string;
  search?: string;
  category?: string;
  title?: string;
}
export interface Blog {
  id: string;
  _id: string;
  image: string;
  title: string;
  author: { firstName: string; lastName: string };
  createdAt: string;
  category: string;
  content: string;
  slug: string;
}
export interface RecentPostProps {
  img: string;
  date: string;
  title: string;
  route: string;
}
export interface Comment {
  id: string;
  content: string;
  user: {
    _id: string;
    firstName: string;
    lastName: string;
    id: string;
  };
  createdAt: string;
  likeCount: number;
  dislikeCount: number;
  replies: Comment[];
  reaction: string | null;
}
export interface RefreshTokenResponse {
  accessToken: string;
}
export interface BlogInteractionsProps {
  likeCount: number;
  dislikeCount: number;
  viewsCount: number;
  userReaction: { data: { type: string } } | null;
  handleLike: () => void;
  handleDislike: () => void;
}

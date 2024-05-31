import { AxiosError } from "axios";
import axiosInstance from "./axiosInstance";
import { ApiErrorResponse } from "@/types";

export const getPosts = async (): Promise<any> => {
  return axiosInstance.get<any>(`/posts?page=1&limit=50&type=post`);
};

export const getSavedPosts = async (): Promise<any> => {
  return axiosInstance.get<any>(`/save-posts/user`);
};

export const fetchPostQuery = async (postId: number): Promise<any> => {
  return axiosInstance.get<any>(`/posts/${postId}`);
};

export const deletePost = async (id: number): Promise<any> => {
  return axiosInstance.delete<any>(`/posts/user/${id}`);
};

export const fetchSinglePostStat = async (
  id: number,
  emojiId?: number | null
): Promise<any> => {
  return axiosInstance.get<any>(
    `/post-like/${id}/users-like?${
      emojiId && emojiId > 0 && `emojiId=${emojiId}`
    }`
  );
};

export const fetchSinglePostEmojis = async (id: number): Promise<any> => {
  return axiosInstance.get<any>(`/post-like/emoji-count/${id}`);
};

export const likeOrUnlikePost = async (
  postId: number,
  type: string,
  emojiId: number
): Promise<any> => {
  return axiosInstance.post<any>("/post-like", {
    postId,
    type,
    emojiId: emojiId,
  });
};

export const postCommentQuery = async (
  postId: number,
  comment: string
): Promise<any> => {
  return axiosInstance.post<any>("/post-comments", {
    postId,
    comment,
  });
};

export const likeOrUnlikeComment = async (
  commentId: number,
  type: string
): Promise<any> => {
  return axiosInstance.post<any>("/post-like", { commentId, type });
};

export const saveOrUnsavePost = async (postId: number): Promise<any> => {
  return axiosInstance.post<any>("/save-posts", {
    postId: postId,
  });
};

export const likeOrUnlikeReply = async (
  replyId: number,
  type: string
): Promise<any> => {
  return axiosInstance.post<any>("/post-like", { replyId, type });
};

export const reportPostQuery = async (
  postId: number,
  reason: string
): Promise<any> => {
  return axiosInstance.post<any>("/report-post", {
    postId: postId,
    reason: reason,
  });
};

export const blockUserQuery = async (userId: number): Promise<any> => {
  return axiosInstance.post<any>("/blockuser", {
    followerId: userId,
  });
};

export const unblockUserQuery = async (data: {
  userId: number;
}): Promise<any> => {
  return axiosInstance.delete<any>(`/blockuser/${data.userId}`);
};

export const getSinglePost = async (postId: number): Promise<any> => {
  return axiosInstance.get<any>(`/posts/${postId}`);
};

export const getReasons = async (): Promise<any> => {
  return axiosInstance.get<any>(`/report-post/reasons`);
};

export const fetchCommentReplies = async (commentId: number): Promise<any> => {
  return axiosInstance.get<any>(`/reply/${commentId}/comment?page=1&limit=10`);
};

export const fetchReplyReplies = async (replyId: number): Promise<any> => {
  return axiosInstance.get<any>(`/reply/${replyId}/comment?page=1&limit=10`);
};

export const getSinglePostComments = async (postId: number): Promise<any> => {
  return axiosInstance.get<any>(
    `/post-comments/comments/${postId}?page=1&limit=10`
  );
};

export const getPollResponse = async (
  postId: number,
  pollOptionId: number
): Promise<any> => {
  return axiosInstance.post<any>(`/poll-response`, { postId, pollOptionId });
};

import { AxiosError } from "axios";
import axiosInstance from "./axiosInstance";
import { ApiErrorResponse } from "@/types";

export const likeOrUnlikePost = async (
  postId: number,
  type: string
): Promise<any> => {
  return axiosInstance.post<any>("/post-like", { postId, type });
};

export const likeOrUnlikeComment = async (
  commentId: number,
  type: string
): Promise<any> => {
  return axiosInstance.post<any>("/post-like", { commentId, type });
};

export const likeOrUnlikeReply = async (
  replyId: number,
  type: string
): Promise<any> => {
  return axiosInstance.post<any>("/post-like", { replyId, type });
};

export const getSinglePost = async (postId: number): Promise<any> => {
  return axiosInstance.get<any>(`/posts/${postId}`);
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

import { AxiosError } from "axios";
import axiosInstance from "./axiosInstance";
import { ApiErrorResponse } from "@/types";

export const getPosts = async ({
  pageParam,
}: {
  pageParam: number;
}): Promise<any> => {
  const limit = 20;
  return axiosInstance.get<any>(
    `/posts?page=${pageParam + 1}&limit=${limit}&type=post`
  );
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
export const replyCommentQuery = async (
  commentId: number,
  message: string
): Promise<any> => {
  return axiosInstance.post<any>("/reply", {
    // "parentcommentId": 4, // use this to add reply ID
    commentId,
    message,
    type: "reply", //comment, reply
  });
};
export const nestedReplyQuery = async (
  commentId: number,
  replyId: number,
  message: string
): Promise<any> => {
  return axiosInstance.post<any>("/reply", {
    parentcommentId: 4, // use this to add reply ID
    replyId: replyId,
    commentId,
    message,
    type: "reply", //comment, reply
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

export const muteUserQuery = async (userId: number): Promise<any> => {
  return axiosInstance.post<any>("/post-settings/mute-user", {
    accountId: 9,
  });
};

export const blacklistPostQuery = async (postId: number): Promise<any> => {
  return axiosInstance.post<any>("/post-settings", {
    postId,
    mute: true,
    interest: false,
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

export const fetchCommentReplies = async (
  commentId: number,
  pageParam: number
): Promise<any> => {
  const limit = 10;
  return axiosInstance.get<any>(
    `/reply/${commentId}/comment?page=${pageParam + 1}&limit=${limit}`
  );
};

export const fetchReplyReplies = async (replyId: number): Promise<any> => {
  return axiosInstance.get<any>(`/reply/${replyId}/comment?page=1&limit=10`);
};

export const getSinglePostComments = async (
  postId: number,
  pageParam: number
): Promise<any> => {
  const limit = 10;
  return axiosInstance.get<any>(
    `/post-comments/comments/${postId}?page=${pageParam + 1}&limit=${limit}`
  );
};

// export const getPosts = async ({
//   pageParam,
// }: {
//   pageParam: number;
// }): Promise<any> => {
//   const limit = 20;
//   return axiosInstance.get<any>(
//     `/posts?page=${pageParam + 1}&limit=${limit}&type=post`
//   );
// };

export const getPollResponse = async (
  postId: number,
  pollOptionId: number
): Promise<any> => {
  return axiosInstance.post<any>(`/poll-response`, { postId, pollOptionId });
};

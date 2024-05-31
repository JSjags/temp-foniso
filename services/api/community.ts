import { ApiResponse, CommunityMember, PostMeta, User } from "@/types";
import axiosInstance from "./axiosInstance";
import { CommunityContext } from "@/types/community";

export const pendingRequests = async (): Promise<Array<CommunityContext>> => {
  return await axiosInstance.get("/community/pending-request");
};

export const allCommunities = async (
  page = 1,
  limit = 50
): Promise<ApiResponse<Array<CommunityContext>>> => {
  return await axiosInstance.get(`/community?page=${page}&limit=${limit}`);
};

export const getOneCommunity = async (
  community_id: string
): Promise<CommunityContext> => {
  return await axiosInstance.get(`/community/${community_id}`);
};

export const communityMembers = async (
  community_id: string
): Promise<ApiResponse<Array<CommunityMember>>> => {
  return await axiosInstance.get(
    `/community-member/members/${community_id}?limit=10&page=1`
  );
};

export const getUsers = async (): Promise<Array<User>> => {
  return await axiosInstance.get("/users");
};

export const communityPost = async (
  community_id: string
): Promise<ApiResponse<Array<PostMeta>>> => {
  return await axiosInstance.get(`/posts/community/${community_id}`);
};

export const allBuzz = async (page = 1, limit = 20) => {
  return await axiosInstance.get(
    `/community-buzz/all?page=${page}&limit=${limit}`
  );
};

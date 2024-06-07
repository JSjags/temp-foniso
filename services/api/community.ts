import { CommunityContext } from "./../../types/community";
import {
  ApiResponse,
  ApiResponseDeep,
  CommunityMember,
  PostMeta,
  User,
} from "@/types";
import axiosInstance from "./axiosInstance";

export const pendingRequests = async (): Promise<{
  data: { data: Array<CommunityContext> };
}> => {
  return await axiosInstance.get("/community/pending-request");
};

export const makeModeratorQuery = async (
  memberId: string,
  community_id: string
): Promise<{
  data: { data: Array<User> };
}> => {
  return await axiosInstance.post(`/community-moderator`, {
    userId: parseInt(memberId),
    communityId: parseInt(community_id),
  });
};

export const removeModeratorQuery = async (
  memberId: string,
  community_id: string
): Promise<{
  data: { data: Array<User> };
}> => {
  return await axiosInstance.delete(
    `/community-moderator/${memberId}/community/${community_id}`
  );
};

export const singleCommunityPendingRequests = async (
  community_id: number
): Promise<{
  data: { data: Array<User> };
}> => {
  return await axiosInstance.get(
    `/community-member/pending-request/${community_id}`
  );
};

export const allCommunities = async (
  page = 1,
  limit = 50,
  param = ""
): Promise<ApiResponseDeep<Array<CommunityContext>>> => {
  return await axiosInstance.get(
    `/community?page=${page}&limit=${limit}&param=${param}`
  );
};
export const userCommunities = async (
  page = 1,
  limit = 50,
  param = ""
): Promise<ApiResponseDeep<Array<CommunityContext>>> => {
  return await axiosInstance.get(`/community/user`);
};

export const getOneCommunity = async (
  community_id: string
): Promise<{ data: { data: CommunityContext } }> => {
  return await axiosInstance.get(`/community/${community_id}`);
};

export const communityMembers = async (
  community_id: string
): Promise<ApiResponse<Array<CommunityMember>>> => {
  return await axiosInstance.get(
    `/community-member/members/${community_id}?limit=10&page=1`
  );
};

export const communityMembersv2 = async (
  community_id: string
): Promise<ApiResponseDeep<Array<CommunityMember>>> => {
  return await axiosInstance.get(
    `/community-member/members/${community_id}?limit=10&page=1`
  );
};

export const communityModerators = async (
  community_id: string
): Promise<ApiResponseDeep<Array<CommunityMember>>> => {
  return await axiosInstance.get(
    `/community-moderator/moderators/${community_id}?limit=10&page=1`
  );
};

export const getUsers = async (): Promise<{ data: { data: User[] } }> => {
  return await axiosInstance.get("/users");
};

export const communityPost = async (
  community_id: string
): Promise<ApiResponseDeep<Array<PostMeta>>> => {
  console.log(community_id);
  return await axiosInstance.get(`/posts/community/${community_id}`);
};

export const allBuzz = async (page = 1, limit = 20) => {
  return await axiosInstance.get(
    `/community-buzz/all?page=${page}&limit=${limit}`
  );
};

export const updateCommunity = async (communityId: string, data: FormData) => {
  return await axiosInstance.patch(`/community/${communityId}`, data);
};

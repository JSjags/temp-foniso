// explore/postcategory

import { AxiosError, CancelToken } from "axios";
import axiosInstance from "./axiosInstance";
import { ApiErrorResponse } from "@/types";

export const getFavoriteSports = async (): Promise<any> => {
  return axiosInstance.get<any>("/explore/postcategory");
};

export const peopleSuggestions = async (): Promise<any> => {
  return await axiosInstance.get<any>("/explore/people");
};

export const followUserQuery = async (data: {
  followerId: number;
}): Promise<any> => {
  return axiosInstance.post<any>("/followers", data);
};

export const getExploreSuggestions = async (
  query: string,
  cancelToken: CancelToken
): Promise<any> => {
  return axiosInstance.get<any>(
    `/explore/searchuser/${query}?limit=20&page=1`,
    { cancelToken }
  );
};

export const searchUsername = async (
  username: string,
  cancelToken: CancelToken
): Promise<any> => {
  return axiosInstance.get<any>(`/users/search/${username}`, { cancelToken });
};

export const searchExplore = async (
  query: string,
  type: string = "posts"
): Promise<any> => {
  if (type === "user") {
    return axiosInstance.get<any>(
      `/explore/searchuser/${query}?limit=20&page=1`
    );
  }
  if (type === "post") {
    return axiosInstance.get<any>(
      `/explore/searchPost/${query}?limit=20&page=1`
    );
  }
  if (type === "community") {
    return axiosInstance.get<any>(
      `/explore/searchCommunity/${query}?limit=20&page=1`
    );
  }
};

export const unfollowUserQuery = async (data: {
  followerId: number;
}): Promise<any> => {
  return axiosInstance.delete<any>(`/followers/unfollow/${data.followerId}`);
};

export const unblockUserQuery = async (data: {
  userId: number;
}): Promise<any> => {
  return axiosInstance.delete<any>(`blockuser/${data.userId}`);
};

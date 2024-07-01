import { ApiErrorResponse, LoginCredentials, LoginResponse } from "@/types";
import axiosInstance from "./axiosInstance";
import { AxiosError } from "axios";

export const loginUser = async ({
  email,
  password,
}: LoginCredentials): Promise<LoginResponse> => {
  try {
    const response = await axiosInstance.post<any>("/auth/login", {
      email,
      password,
    });
    // Assuming your API returns some kind of token upon successful login
    console.log(response);
    const token = response.data.token;
    // Store token in local storage or state management library
    localStorage.setItem("token", token);
    return response.data;
  } catch (error) {
    console.log(error);
    const axiosError = error as AxiosError<ApiErrorResponse>;

    throw new Error(axiosError?.response?.data?.message ?? "Login failed");
  }
};

export const getFollowing = async (): Promise<any> => {
  return await axiosInstance.get<any>("/followers/following");
};

export const getSettings = async (): Promise<any> => {
  return await axiosInstance.get<any>("/settings/user");
};
export const updateSettings = async (id: number, data: any): Promise<any> => {
  return await axiosInstance.get<any>(`/settings/${id}`, data);
};

export const getUserFollowing = async (id: number): Promise<any> => {
  return await axiosInstance.get<any>(`/followers/${id}/following`);
};
export const getBlockedUsers = async (): Promise<any> => {
  return axiosInstance.get<any>("/blockuser/blockedUser");
};

export const getUserProfileData = async (): Promise<any> => {
  return axiosInstance.get<any>("/profile/me");
};

export const getFollowers = async (): Promise<any> => {
  return axiosInstance.get<any>("/followers");
};

export const getUserFollowers = async (id: number): Promise<any> => {
  return axiosInstance.get<any>(`/followers/${id}/user`);
};

export const submitUserProfile = async (data: any): Promise<any> => {
  const hasUsernameKey = data.has("username");

  if (hasUsernameKey) {
    return axiosInstance.patch<any>("/users/profile", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  } else {
    return axiosInstance.post<any>("/user/profile", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  }

  // return axiosInstance.post<any>(
  //   hasUsernameKey ? "/users/update" : "/user/profile",
  //   data,
  //   {
  //     headers: { "Content-Type": "multipart/form-data" },
  //   }
  // );
};

export const updateProfile = async (data: FormData): Promise<any> => {
  return axiosInstance.patch<any>("/users/update", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const getHighlights = async (): Promise<any> => {
  return axiosInstance.get<any>(`/posts?page=1&limit=5&type=highlight`);
};

export const getSportHighlights = async (): Promise<any> => {
  return axiosInstance.get<any>(
    `/explore/sport-highlights?startDate=2023-12-18`
  );
};

export const getTeams = async (): Promise<any> => {
  return axiosInstance.get<any>(`/extra/teams`);
};

export const getUsersCommunities = async (): Promise<any> => {
  return axiosInstance.get<any>(`/community/user`);
};

export const getPublicUserProfile = async (username: string): Promise<any> => {
  return axiosInstance.get<any>(`/profile/${username}`);
};

export const fetchUsersPosts = async (
  id: number,
  pageParam: number
): Promise<any> => {
  const limit = 10;
  return axiosInstance.get<any>(
    `/posts/user/${id}?page=${pageParam + 1}&limit=${limit}`
  );
};

export const fetchUsersPostsPublic = async (
  id: number,
  pageParam: number
): Promise<any> => {
  const limit = 10;
  return axiosInstance.get<any>(
    `/extra/posts/user/${id}?page=${pageParam + 1}&limit=${limit}`
  );
};

export const fetchSavedPosts = async (): Promise<any> => {
  return axiosInstance.get<any>(`/save-posts/user`);
};

export const professionalVerificationRequest = async (
  data: FormData
): Promise<any> => {
  return axiosInstance.patch("/user/profile/upgrade-account", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const organizationVerificationRequest = async (
  data: FormData
): Promise<any> => {
  return axiosInstance.patch("/user/profile/upgrade-account", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const createPostQuery = async (data: FormData): Promise<any> => {
  return axiosInstance.post("/posts", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const updatePostQuery = async (
  data: FormData,
  postId: number
): Promise<any> => {
  return axiosInstance.patch(`/posts/${postId}`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

// export const manualLoginUser = async ({
//   email,
//   password,
// }: LoginCredentials): Promise<LoginResponse> => {
//   try {
//     const response = await axiosInstance.post<LoginResponse>("/auth/login", {
//       email,
//       password,
//     });
//     // Assuming your API returns some kind of token upon successful login
//     console.log(response);
//     const token = response.data.token;
//     // Store token in local storage or state management library
//     localStorage.setItem("token", token);
//     return response.data;
//   } catch (error) {
//     const axiosError = error as AxiosError<ApiErrorResponse>;
//     throw new Error(axiosError?.response?.data?.message ?? "Login failed");
//   }
// };
// posts/user/:userId?page=1&limit=200

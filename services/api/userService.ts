import { ApiErrorResponse, LoginCredentials, LoginResponse } from "@/types";
import axiosInstance from "./axiosInstance";
import { AxiosError } from "axios";

export const loginUser = async ({
  email,
  password,
}: LoginCredentials): Promise<LoginResponse> => {
  try {
    const response = await axiosInstance.post<LoginResponse>("/auth/login", {
      email,
      password,
    });
    // Assuming your API returns some kind of token upon successful login
    const token = response.data.token;
    // Store token in local storage or state management library
    localStorage.setItem("token", token);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<ApiErrorResponse>;
    throw new Error(axiosError?.response?.data?.message ?? "Login failed");
  }
};

export const getFollowing = async (): Promise<any> => {
  return await axiosInstance.get<any>("/followers/following");
};

export const submitUserProfile = async (data: any): Promise<any> => {
  const hasUsernameKey = data.has("username");

  if (hasUsernameKey) {
    return axiosInstance.patch<any>("/users/update", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  } else {
    return axiosInstance.post<any>("/user/profile", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  }

  return axiosInstance.post<any>(
    hasUsernameKey ? "/users/update" : "/user/profile",
    data,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
};

export const getHighlights = async (): Promise<any> => {
  return axiosInstance.get<any>(`/posts?page=1&limit=5&type=highlight`);
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

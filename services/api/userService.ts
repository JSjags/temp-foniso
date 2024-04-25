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
    console.log(response);
    const token = response.data.token;
    // Store token in local storage or state management library
    localStorage.setItem("token", token);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<ApiErrorResponse>;
    throw new Error(axiosError?.response?.data?.message ?? "Login failed");
  }
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

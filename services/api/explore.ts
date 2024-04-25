// explore/postcategory

import { AxiosError } from "axios";
import axiosInstance from "./axiosInstance";
import { ApiErrorResponse } from "@/types";

export const getFavoriteSports = async (): Promise<any> => {
  return axiosInstance.get<any>("/explore/postcategory");
};

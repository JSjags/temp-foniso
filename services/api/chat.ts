import axiosInstance from "./axiosInstance";

export const uploadImage = async (data: FormData): Promise<any> => {
  return axiosInstance.post<any>("/messages/upload-image", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

// /messages/upload-image

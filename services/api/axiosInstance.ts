// axiosInstance.ts

import axios, { AxiosInstance } from "axios";
import toast from "react-hot-toast";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  // You can add custom headers or any other axios configurations here
});

// Add a request interceptor to include the bearer token in the headers
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    console.log(token);
    if (token !== undefined && token !== null && token !== "undefined") {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  function (response) {
    // return response.data.data;
    return response;
  },
  function (error) {
    // toast.custom((t) => {
    //   return (
    //     <ErrorToast
    //       t={t}
    //       message={error?.response?.data?.message ?? "An error occurred"}
    //     />
    //   );
    // });
    // toast.error(error?.response?.data?.message ?? "An error occurred");
    // return Promise.reject(error);

    return Promise.reject(error);
  }
);

export default axiosInstance;

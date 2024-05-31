import axiosInstance from "./axiosInstance";

export const getNews = async (
  pageNumber: number,
  tab: string
): Promise<any> => {
  return axiosInstance.get<any>(
    `/posts/news?page=${pageNumber}&limit=100&sport_type=${
      tab ? tab.toLowerCase() : "all"
    }`
  );
};

export const getSingleNews = async (newsId: number): Promise<any> => {
  return axiosInstance.get<any>(`/posts/${newsId}`);
};

export const getSports = async (): Promise<any> => {
  return axiosInstance.get<any>(`/extra/sports`);
};

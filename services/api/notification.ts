import axiosInstance from "./axiosInstance";

export const getNotifications = async (): Promise<any> => {
  return axiosInstance.get<any>(`/notifications?limit=10&page=1`);
};

export const getUnreadNotificationsCount = async (): Promise<any> => {
  return axiosInstance.get<any>(`/notifications/unread-count
  `);
};

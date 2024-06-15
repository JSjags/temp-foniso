import axiosInstance from "./axiosInstance";

export const getNotifications = async ({
  pageParam,
}: {
  pageParam: number;
}): Promise<any> => {
  const limit = 20;
  return axiosInstance.get<any>(
    `/notifications?page=${pageParam + 1}&limit=${limit}`
  );
};

// export const getNotifications = async (): Promise<any> => {
//   return axiosInstance.get<any>(`/notifications?limit=10&page=1`);
// };

export const getUnreadNotificationsCount = async (): Promise<any> => {
  return axiosInstance.get<any>(`/notifications/unread-count
  `);
};

export const markAllAsReadQuery = async (data: number[]): Promise<any> => {
  return axiosInstance.patch<any>(`/notifications/bulk-update`, { id: data });
};

export const deleteNotificationQuery = async (id: number): Promise<any> => {
  return axiosInstance.delete<any>(`/notifications/${id}`);
};

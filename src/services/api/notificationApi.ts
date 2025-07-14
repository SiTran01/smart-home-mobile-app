import api from '../axiosInstance';

export interface Notification {
  _id: string;
  user: string;
  type: string;
  title: string;
  message?: string;
  data?: Record<string, any>;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
}

// ✅ Lấy toàn bộ notifications
export const getAllNotifications = async (token: string): Promise<Notification[]> => {
  console.log('🔑 [getAllNotifications] Token:', token);
  const response = await api.get<{ success: boolean; data: Notification[] }>('/notification/getallnotification', {
    headers: { Authorization: `Bearer ${token}` },
  });
  console.log('📦 [getAllNotifications] Response:', response.data);
  return response.data.data;
};

export const getNotificationsPaged = async (
  token: string,
  skip = 0,
  limit = 20
): Promise<Notification[]> => {
  console.log('🔑 [getNotificationsPaged] Token:', token, 'skip:', skip, 'limit:', limit);
  const response = await api.get<{ success: boolean; data: Notification[] }>(
    '/notification/getallnotification/paged',
    {
      headers: { Authorization: `Bearer ${token}` },
      params: { skip, limit },
    }
  );
  console.log('📦 [getNotificationsPaged] Response:', response.data);
  return response.data.data;
};

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

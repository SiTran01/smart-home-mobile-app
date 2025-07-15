import api from '../axiosInstance';

export interface Notification {
  _id: string;
  user: string;
  type: 'invitation' | 'invitation_response' | 'device' | 'system' | 'warning' | 'alarm';
  title: string;
  message?: string;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;

  // Populated invitation data
  invitationDataId?: {
    _id: string;
    status: 'pending' | 'accepted' | 'declined';
    role: 'admin' | 'member';
    message?: string;
    home?: {
      _id: string;
      name: string;
    };
    inviter?: {
      _id: string;
      name: string;
    };
    invitee?: {
      _id: string;
      name: string;
    };
  };

  // Populated device data
  deviceDataId?: {
    _id: string;
    name: string;
    type: string;
    status: string;
    // thêm fields khác của device nếu cần
  };

  // Populated room data
  roomDataId?: {
    _id: string;
    name: string;
  };

  // Populated home data
  homeDataId?: {
    _id: string;
    name: string;
  };

  // Nếu mày dùng field data dynamic
  data?: Record<string, any>;
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

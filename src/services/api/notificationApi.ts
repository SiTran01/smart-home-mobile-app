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

  entityType: 'Invitation' | 'Device' | 'Room' | 'Home';
  entityId: InvitationEntity | DeviceEntity | RoomEntity | HomeEntity | null;
}

export interface InvitationEntity {
  _id: string;
  status: 'pending' | 'accepted' | 'declined';
  role: 'admin' | 'member';
  alias: string; // 👈 thêm dòng này
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
    email: string;
    picture?: string;
  };
  createdAt: string;
}

export interface DeviceEntity {
  _id: string;
  name: string;
  type: string;
  status: string;
  room?: {
    _id: string;
    name: string;
  };
  home?: {
    _id: string;
    name: string;
  };
}

export interface RoomEntity {
  _id: string;
  name: string;
  home?: {
    _id: string;
    name: string;
  };
}

export interface HomeEntity {
  _id: string;
  name: string;
  owner?: {
    _id: string;
    name: string;
  };
}

// ✅ Get all notifications
export const getAllNotifications = async (token: string): Promise<Notification[]> => {
  console.log('🔑 [getAllNotifications] Token:', token);
  const response = await api.get<{ success: boolean; data: Notification[] }>('/notification/getallnotification', {
    headers: { Authorization: `Bearer ${token}` },
  });
  console.log('📦 [getAllNotifications] Response:', response.data);
  return response.data.data;
};

// ✅ Get notifications paginated
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

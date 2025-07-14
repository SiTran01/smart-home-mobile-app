import { create } from 'zustand';
import { Notification } from '../services/api/notificationApi';

interface NotificationState {
  notifications: Notification[];
  page: number;
  hasMore: boolean;
  addNotification: (notification: Notification) => void;
  setNotifications: (list: Notification[]) => void;
  appendNotifications: (list: Notification[]) => void;
  updateNotificationStatus: (id: string, status: string) => void;
  setPage: (page: number) => void;
  setHasMore: (hasMore: boolean) => void;
  reset: () => void;
}

const useNotificationStore = create<NotificationState>((set, get) => ({
  notifications: [],
  page: 1,
  hasMore: true,

  addNotification: (notification) => {
    const exists = get().notifications.find(n => n._id === notification._id);
    if (exists) return;
    set({ notifications: [notification, ...get().notifications] });
  },

  setNotifications: (list) => set({ notifications: list }),

  appendNotifications: (list) => {
    const state = get();
    const newNoti = list.filter(n => !state.notifications.find(sn => sn._id === n._id));
    set({ notifications: [...state.notifications, ...newNoti] });
  },

  updateNotificationStatus: (id, status) => {
    set({
      notifications: get().notifications.map(n =>
        n._id === id ? { ...n, data: { ...n.data, status } } : n
      ),
    });
  },

  setPage: (page) => set({ page }),
  setHasMore: (hasMore) => set({ hasMore }),

  reset: () => set({ notifications: [], page: 1, hasMore: true }),
}));

export default useNotificationStore;

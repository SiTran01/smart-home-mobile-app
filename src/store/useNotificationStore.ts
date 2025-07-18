import { create } from 'zustand';
import { Notification } from '../services/api/notificationApi';
import useHomeStore from './useHomeStore';
import useUserStore from './useUserStore';

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
  resetStore: () => void;
}

const useNotificationStore = create<NotificationState>((set, get) => ({
  notifications: [],
  page: 1,
  hasMore: true,

  addNotification: async (notification) => {
    const exists = get().notifications.find(n => n._id === notification._id);
    if (exists) return;

    const { addMemberToHome, deleteHome, setHomes, homes } = useHomeStore.getState();
    const currentUserId = useUserStore.getState().user?._id;

    // ✅ Handle invitation_response ➔ add member vào home
    if (
        notification.type === 'invitation_response' &&
        notification.entityType === 'Invitation' &&
        notification.entityId &&
        typeof notification.entityId === 'object' &&
        'status' in notification.entityId &&
        notification.entityId.status === 'accepted'
    ) {
        const invitation = notification.entityId;

        if ('invitee' in invitation && 'home' in invitation && invitation.invitee && invitation.home) {
        addMemberToHome(invitation.home._id, {
            user: {
            _id: invitation.invitee._id,
            name: invitation.invitee.name,
            email: invitation.invitee.email,
            picture: invitation.invitee.picture,
            },
            role: (invitation.role as 'admin' | 'user') || 'user',
            alias: invitation.alias || invitation.invitee.name,
        });
        console.log('✅ [NotificationStore] Added member to home from invitation response');
        }
    }

    // ✅ Handle home_deleted ➔ delete home from store
    if (
        notification.type === 'home_deleted' &&
        notification.entityType === 'Home' &&
        notification.entityId
    ) {
        const homeId = typeof notification.entityId === 'string' ? notification.entityId : notification.entityId._id;
        console.log('🏠 [NotificationStore] Home deleted notification received, deleting home:', homeId);
        deleteHome(homeId);
    }

    // ✅ Handle home_removemember ➔ update members & xóa home nếu current user bị kick
    if (
        notification.type === 'home_removemember' &&
        notification.entityType === 'Home' &&
        notification.entityId
    ) {
        const entityId = notification.entityId;
        const homeId = typeof entityId === 'string' ? entityId : entityId._id;

        if (typeof entityId === 'object' && 'members' in entityId) {
        const updatedHomes = homes.map(home => {
            if (home._id === homeId) {
            console.log('✅ [NotificationStore] Overwriting members from backend data');
            return {
                ...home,
                members: entityId.members,
            };
            }
            return home;
        });

        setHomes(updatedHomes);
        console.log('✅ [NotificationStore] Updated home members:', updatedHomes);

        // 📝 Check nếu current user KHÔNG còn trong members ➔ delete home khỏi store
        const updatedHome = updatedHomes.find(h => h._id === homeId);
        const stillMember = updatedHome?.members.some(m => m.user._id === currentUserId);
        if (!stillMember) {
            console.log('🏠 [NotificationStore] Current user removed (not in members), deleting home:', homeId);
            deleteHome(homeId);
        }
        }
    }

    if (
        notification.type === 'home_renamed' &&
        notification.entityType === 'Home' &&
        notification.entityId
    ) {
        const updatedHome = notification.entityId;
        console.log('🏠 [NotificationStore] Home rename notification received, updating home name:', updatedHome._id);

        const { homes, setHomes } = useHomeStore.getState();

        const newHomes = homes.map(home =>
            home._id === updatedHome._id
            ? { ...home, name: updatedHome.name } // 👈 chỉ update name
            : home
        );

        setHomes(newHomes);
    }

    // ✅ Cuối cùng add notification vào store
    set({ notifications: [notification, ...get().notifications] });
    },



  setNotifications: (list) => set({ notifications: list }),

  appendNotifications: (list) => {
    const existingNoti = get().notifications ?? [];
    const newNoti = list.filter(n =>
      !existingNoti.find(sn => sn._id === n._id)
    );
    set({ notifications: [...existingNoti, ...newNoti] });
  },

  updateNotificationStatus: (id, status) => {
    set({
      notifications: get().notifications.map(n => {
        if (n._id !== id) return n;

        // ✅ Chỉ update nếu entityType là Invitation và có status
        if (
          n.entityType === 'Invitation' &&
          n.entityId &&
          typeof n.entityId === 'object' &&
          'status' in n.entityId
        ) {
          return {
            ...n,
            entityId: { ...n.entityId, status },
          };
        }
        return n;
      }),
    });
  },

  setPage: (page) => set({ page }),
  setHasMore: (hasMore) => set({ hasMore }),

  reset: () => set({ notifications: [], page: 1, hasMore: true }),

  resetStore: () =>
    set({
      notifications: [],
      page: 1,
      hasMore: true,
    }),
}));

export default useNotificationStore;

import useUserStore from './useUserStore';
import useHomeStore from './useHomeStore';
import useRoomStore from './useRoomStore';
import useDeviceStore from './useDeviceStore';
import useNotificationStore from './useNotificationStore';  

export const resetAllStores = () => {
  useUserStore.getState().resetStore();
  useHomeStore.getState().resetStore();
  useRoomStore.getState().resetStore();
  useDeviceStore.getState().resetStore();
  useNotificationStore.getState().resetStore();
};

import useUserStore from './useUserStore';
import useHomeStore from './useHomeStore';
import useRoomStore from './useRoomStore';
import useDeviceStore from './useDeviceStore';

export const resetAllStores = () => {
  useUserStore.getState().resetStore();
  useHomeStore.getState().resetStore();
  useRoomStore.getState().resetStore();
  useDeviceStore.getState().resetStore();
};

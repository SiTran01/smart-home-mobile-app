import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAllDevices } from '../services/api/deviceApi'; // chỉnh path theo project mày
import useDeviceStore from '../store/useDeviceStore'; // ✅ import device store để set devices
import useUserStore from '../store/useUserStore'; // ✅ import user store
import useHomeStore from '../store/useHomeStore'; // ✅ import home store để lấy homeId

const useLoadDevices = () => {
  const setDevices = useDeviceStore((state) => state.setDevices);
  const user = useUserStore((state) => state.user);
  const selectedHomeId = useHomeStore((state) => state.selectedHomeId); // ✅ lấy selectedHomeId

  useEffect(() => {
    const fetchDevices = async () => {
      if (!user) {
        console.log('[useLoadDevices] No user found, skipping fetch');
        return;
      }

      if (!selectedHomeId) {
        console.log('[useLoadDevices] No selectedHomeId found, skipping fetch');
        return;
      }

      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
          console.log('[useLoadDevices] No token found');
          return;
        }

        const devices = await getAllDevices(token, selectedHomeId);
        console.log('[useLoadDevices] Fetched devices:', devices);
        setDevices(devices);

      } catch (err) {
        console.error('[useLoadDevices] Failed to load devices:', err);
      }
    };

    fetchDevices();
  }, [user, selectedHomeId, setDevices]); // ✅ chạy lại khi user hoặc home thay đổi
};

export default useLoadDevices;

// src/hooks/useSocketConnection.ts
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import socket from '../services/socket/socket';
import useNotificationStore from '../store/useNotificationStore'; // 👈 import store

const useSocketConnection = () => {
  const addNotification = useNotificationStore(state => state.addNotification); // 👈 lấy action từ store

  useEffect(() => {
    let isMounted = true;

    const connectSocket = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (!isMounted) return;

        if (token) {
          console.log('🔌 [useSocketConnection] Retrieved token, connecting socket');

          socket.auth = { token };
          socket.connect();

          // ✅ Lắng nghe thông báo mới
          const handleNewNotification = (data: any) => {
            console.log('🔔 [useSocketConnection] New notification received:', data);

            addNotification(data); // 👈 cập nhật store

            Toast.show({
              type: 'info',
              text1: data.title,
              text2: data.message,
              position: 'top',
              visibilityTime: 3000,
            });
          };

          socket.on('newNotification', handleNewNotification);
        } else {
          console.log('🔌 [useSocketConnection] No token found, disconnecting socket');
          if (socket.connected) {
            socket.disconnect();
          }
        }
      } catch (err) {
        console.error('❌ [useSocketConnection] Failed to get token:', err);
      }
    };

    connectSocket();

    return () => {
      isMounted = false;

      console.log('🔌 [useSocketConnection] Cleanup disconnect and off listener');
      socket.off('newNotification'); // 👈 remove listener khi unmount
      if (socket.connected) {
        socket.disconnect();
      }
    };
  }, [addNotification]); // 👈 thêm dependency addNotification
};

export default useSocketConnection;

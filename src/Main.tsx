// Main.tsx
import React, { useEffect, useState } from 'react'; 
import { View, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';

import RootNavigator from './navigation/RootNavigator';
import useUserStore from './store/useUserStore';
import { fetchUserInfo } from './services/api/authApi';
import useLoadHomes from './hooks/useLoadHomes';
import socket from './services/socket/socket';

const Main = () => {
  const { setUser } = useUserStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        console.log('[Main] Retrieved token:', token);

        if (token) {
          const user = await fetchUserInfo(token);
          if (user) {
            setUser(user);
            console.log('[Main] Loaded user:', user);

            // 🔌 Connect socket here
            socket.auth = { token };
            socket.connect();
            console.log('🔌 [Main] Socket connect called');
          } else {
            console.log('[Main] No user returned, removing token');
            await AsyncStorage.removeItem('token');
          }
        } else {
          console.log('[Main] No token found');
        }
      } catch (err) {
        console.error('[Main] Failed to load user:', err);
        await AsyncStorage.removeItem('token');
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();

    // 🔧 Optional: Cleanup on unmount (disconnect socket)
    return () => {
      if (socket.connected) {
        socket.disconnect();
        console.log('🔌 [Main] Socket disconnected on unmount');
      }
    };
  }, [setUser]);

  useLoadHomes(); // Load homes khi user đã có (fix logic theo project của mày)

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
};

export default Main;

// src/Main.tsx
import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';

import RootNavigator from './navigation/RootNavigator';
import useUserStore from './store/useUserStore';
import { fetchUserInfo } from './services/api/authApi';
import useLoadHomes from './hooks/useLoadHomes';
import useSocketConnection from './hooks/useSocketConnection';
import Toast from 'react-native-toast-message';
import useLoadNotifications from './hooks/useLoadNotifications';

const Main = () => {
  const { setUser } = useUserStore();
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);

  useSocketConnection();
  useLoadHomes();

  // 🚀 Gọi useLoadNotifications khi có token
  useLoadNotifications(token);

  useEffect(() => {
    const loadUser = async () => {
      console.log('[Main] 🔄 Bắt đầu load user từ AsyncStorage');
      try {
        const savedToken = await AsyncStorage.getItem('token');
        console.log('[Main] ✅ Retrieved token:', savedToken);

        if (savedToken) {
          console.log('[Main] 🔍 Fetching user info with token...');
          const user = await fetchUserInfo(savedToken);
          if (user) {
            console.log('[Main] ✅ Loaded user:', user);
            setUser(user);
            setToken(savedToken); // 👈 lưu token vào state
          } else {
            console.log('[Main] ⚠️ No user returned, removing token');
            await AsyncStorage.removeItem('token');
          }
        } else {
          console.log('[Main] ⚠️ No token found');
        }
      } catch (err) {
        console.error('[Main] ❌ Failed to load user:', err);
        await AsyncStorage.removeItem('token');
      } finally {
        console.log('[Main] 🔚 Finished loading user');
        setIsLoading(false);
      }
    };

    loadUser();
  }, [setUser]);

  if (isLoading) {
    console.log('[Main] ⏳ isLoading true, showing ActivityIndicator');
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  console.log('[Main] ✅ Render NavigationContainer');

  return (
    <>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
      <Toast />
    </>
  );
};

export default Main;

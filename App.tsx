import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './src/navigation/RootNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useUserStore from './src/store/useUserStore';
import { fetchUserInfo } from './src/services/userApi/userApi';
import { ActivityIndicator, View } from 'react-native'; // ✅ import thêm

const App = () => {
  const { setUser } = useUserStore();
  const [isLoading, setIsLoading] = useState(true); // ✅ loading state

  useEffect(() => {
    const loadUser = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        console.log('[App] Retrieved token:', token);
        if (token) {
          const user = await fetchUserInfo(token);
          setUser(user);
          console.log('[App] Loaded user from token:', user);
        } else {
          console.log('[App] No token found');
        }
      } catch (err) {
        console.error('[App] Failed to load user:', err);
        await AsyncStorage.removeItem('token');
      } finally {
        setIsLoading(false); // ✅ done loading
      }
    };

    loadUser();
  }, [setUser]);

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

export default App;

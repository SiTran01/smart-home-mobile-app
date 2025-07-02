import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import useUserStore from '../store/useUserStore'; // ✅ import Zustand store

import LoginScreen from '../screens/LoginScreen/LoginScreen';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import ManageHousesScreen from '../screens/ManageHousesScreen/ManageHousesScreen/ManageHousesScreen';
import HouseOverviewScreen from '../screens/ManageHousesScreen/HouseOverviewScreen';
import NotificationsScreen from '../screens/NotificationsScreen/NotificationsScreen';
import AddDeviceScreen from '../screens/AddDeviceScreen/AddDeviceScreen';
import AddAutomation from '../screens/AddAutomationScreen/AddAutomationScreen';
import UserProfile from '../screens/User/UserProfileScreen';

export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  HouseDetail: { id: string; name: string };
  ManageHouses: undefined;
  HouseOverview: { id: string; name: string };
  Notifications: undefined;
  AddDevice: undefined;
  AddAutomation: undefined;
  UserProfile: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  const { user } = useUserStore(); // ✅ lấy user từ Zustand

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        <>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="ManageHouses" component={ManageHousesScreen} options={{ headerShown: true }} />
          <Stack.Screen name="HouseOverview" component={HouseOverviewScreen} options={{ headerShown: true }} />
          <Stack.Screen
            name="Notifications"
            component={NotificationsScreen}
            options={{ headerShown: true, title: 'Thông báo' }}
          />
          <Stack.Screen name="AddDevice" component={AddDeviceScreen} options={{ headerShown: true }} />
          <Stack.Screen name="AddAutomation" component={AddAutomation} options={{ headerShown: true }} />
          <Stack.Screen name="UserProfile" component={UserProfile} options={{ headerShown: true }} />
        </>
      ) : (
        <Stack.Screen name="Login" component={LoginScreen} />
      )}
    </Stack.Navigator>
  );
};

export default RootNavigator;

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../screens/LoginScreen/LoginScreen';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import ManageHousesScreen from '../screens/ManageHousesScreen/ManageHousesScreen';
import HouseOverviewScreen from '../screens/ManageHousesScreen/HouseOverviewScreen';
import NotificationsScreen from '../screens/NotificationsScreen/NotificationsScreen';
import AddDeviceScreen from '../screens/AddDeviceScreen/AddDeviceScreen';
import AddAutomation from '../screens/AddAutomationScreen/AddAutomationScreen';

export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  HouseDetail: { id: string; name: string };
  ManageHouses: undefined;
  HouseOverview: { id: string; name: string };
  Notifications: undefined;
  AddDevice: undefined;
  AddAutomation: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="ManageHouses" component={ManageHousesScreen} options={{ headerShown: true }} />
      <Stack.Screen name="HouseOverview" component={HouseOverviewScreen} options={{ headerShown: true }} />
      <Stack.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{ headerShown: true, title: 'Thông báo' }} // 👈 thêm title nếu cần
      />
      <Stack.Screen name="AddDevice" component={AddDeviceScreen} options={{ headerShown: true }} />
      <Stack.Screen name="AddAutomation" component={AddAutomation} options={{ headerShown: true }} />
    </Stack.Navigator>
  );
};

export default RootNavigator;

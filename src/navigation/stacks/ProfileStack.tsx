import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileScreen from '../../screens/BottomNavBar/ProfileScreen/ProfileScreen';

const Stack = createNativeStackNavigator();

const ProfileStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="ProfileMain"
      component={ProfileScreen}
      options={{ headerShown: false }} // 👈 cho phép header riêng
    />
  </Stack.Navigator>
);

export default ProfileStack;

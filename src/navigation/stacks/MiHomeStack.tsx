import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MiHomeScreen from '../../screens/BottomNavBar/MiHomeScreen/MiHomeScreen';

const Stack = createNativeStackNavigator();

const MiHomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Home"
      component={MiHomeScreen}
      options={{ headerShown: true }} // 👈 cho phép header
    />
  </Stack.Navigator>
);

export default MiHomeStack;

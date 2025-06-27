import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AccessoriesScreen from '../../screens/BottomNavBar/AccessoriesScreen/AccessoriesScreen';

const Stack = createNativeStackNavigator();

const AccessoriesStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="AccessoriesMain"
      component={AccessoriesScreen}
      options={{ headerShown: true }} // 👈 cho phép header riêng
    />
  </Stack.Navigator>
);

export default AccessoriesStack;

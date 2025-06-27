import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AutomationScreen from '../../screens/BottomNavBar/AutomationScreen/AutomationScreen';

const Stack = createNativeStackNavigator();

const AutomationStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="AutomationMain"
      component={AutomationScreen}
      options={{ headerShown: true }} // 👈 cho phép header riêng
    />
  </Stack.Navigator>
);

export default AutomationStack;

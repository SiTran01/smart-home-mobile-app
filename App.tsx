// App.tsx
import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import HouseDetailScreen from './src/screens/HouseDetailScreen';

export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  HouseDetail: { id: string; name: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="HouseDetail" component={HouseDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

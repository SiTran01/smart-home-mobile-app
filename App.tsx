// App.tsx
import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './src/screens/LoginScreen/LoginScreen';
import HomeScreen from './src/screens/HomeScreen/HomeScreen';

import ManageHousesScreen from './src/screens/ManageHousesScreen/ManageHousesScreen';

export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  HouseDetail: { id: string; name: string };
  ManageHouses: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="ManageHouses" component={ManageHousesScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

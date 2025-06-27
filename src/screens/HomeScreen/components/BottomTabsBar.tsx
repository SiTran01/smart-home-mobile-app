import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import MiHomeScreen from '../../BottomNavBar/MiHomeScreen/MiHomeScreen';
import AccessoriesScreen from '../../BottomNavBar/AccessoriesScreen/AccessoriesScreen';
import AutomationScreen from '../../BottomNavBar/AutomationScreen/AutomationScreen';
import ProfileScreen from '../../BottomNavBar/ProfileScreen/ProfileScreen';

interface Props {
  houseId: string;
}

const Tab = createBottomTabNavigator();

const BottomTabsBar: React.FC<Props> = ({ houseId }) => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName = '';
          if (route.name === 'Mi Home') iconName = 'home-automation';
          else if (route.name === 'Accessories') iconName = 'puzzle';
          else if (route.name === 'Automation') iconName = 'robot';
          else if (route.name === 'Profile') iconName = 'account-circle';
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#007bff',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen
        name="Mi Home"
        children={() => <MiHomeScreen houseId={houseId} />}
      />
      <Tab.Screen
        name="Accessories"
        children={() => <AccessoriesScreen houseId={houseId} />}
      />
      <Tab.Screen
        name="Automation"
        children={() => <AutomationScreen houseId={houseId} />}
      />
      <Tab.Screen
        name="Profile"
        children={() => <ProfileScreen houseId={houseId} />}
      />
    </Tab.Navigator>
  );
};

export default BottomTabsBar;

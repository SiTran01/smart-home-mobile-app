import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MiHomeStack from './stacks/MiHomeStack';
import AutomationStack from './stacks/AutomationStack';
import AccessoriesStack from './stacks/AccessoriesStack';
import ProfileStack from './stacks/ProfileStack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => (
  <Tab.Navigator>
    <Tab.Screen
      name="MiHomeTab"
      component={MiHomeStack}
      options={{
        headerShown: false,
        tabBarIcon: ({ color, size }) => (
          <Icon name="home-outline" color={color} size={size} />
        ),
        tabBarLabel: 'Home',
      }}
    />
    <Tab.Screen
      name="AccessoriesTab"
      component={AccessoriesStack}
      options={{
        headerShown: false,
        tabBarIcon: ({ color, size }) => (
          <Icon name="power-plug-outline" color={color} size={size} />
        ),
        tabBarLabel: 'Accessories',
      }}
    />

    <Tab.Screen
      name="AutomationTab"
      component={AutomationStack}
      options={{
        headerShown: false,
        tabBarIcon: ({ color, size }) => (
          <Icon name="cog-outline" color={color} size={size} />
        ),
        tabBarLabel: 'Automation',
      }}
    />

    <Tab.Screen
      name="ProfileTab"
      component={ProfileStack}
      options={{
        headerShown: false,
        tabBarIcon: ({ color, size }) => (
          <Icon name="account-outline" color={color} size={size} />
        ),
        tabBarLabel: 'Profile',
      }}
    />
  </Tab.Navigator>
);

export default BottomTabNavigator;

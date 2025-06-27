import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import MiHomeStack from './stacks/MiHomeStack';
import AutomationStack from './stacks/AutomationStack';
import AccessoriesStack from './stacks/AccessoriesStack';
import ProfileStack from './stacks/ProfileStack';

const Tab = createBottomTabNavigator();

type TabBarIconProps = {
  color: string;
  size: number;
};

const renderHomeIcon = ({ color, size }: TabBarIconProps) => (
  <Icon name="home-outline" color={color} size={size} />
);

const renderAccessoriesIcon = ({ color, size }: TabBarIconProps) => (
  <Icon name="power-plug-outline" color={color} size={size} />
);

const renderAutomationIcon = ({ color, size }: TabBarIconProps) => (
  <Icon name="cog-outline" color={color} size={size} />
);

const renderProfileIcon = ({ color, size }: TabBarIconProps) => (
  <Icon name="account-outline" color={color} size={size} />
);

const BottomTabNavigator = () => (
  <Tab.Navigator>
    <Tab.Screen
      name="MiHomeTab"
      component={MiHomeStack}
      options={{
        headerShown: false,
        tabBarIcon: renderHomeIcon,
        tabBarLabel: 'Home',
      }}
    />
    <Tab.Screen
      name="AccessoriesTab"
      component={AccessoriesStack}
      options={{
        headerShown: false,
        tabBarIcon: renderAccessoriesIcon,
        tabBarLabel: 'Accessories',
      }}
    />
    <Tab.Screen
      name="AutomationTab"
      component={AutomationStack}
      options={{
        headerShown: false,
        tabBarIcon: renderAutomationIcon,
        tabBarLabel: 'Automation',
      }}
    />
    <Tab.Screen
      name="ProfileTab"
      component={ProfileStack}
      options={{
        headerShown: false,
        tabBarIcon: renderProfileIcon,
        tabBarLabel: 'Profile',
      }}
    />
  </Tab.Navigator>
);

export default BottomTabNavigator;

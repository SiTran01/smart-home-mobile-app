import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../../App';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import AllDevicesScreen from '../BottomNavBar/AllDevicesScreen';
import BedroomScreen from '../BottomNavBar/BedroomScreen';
import KitchenScreen from '../BottomNavBar/KitchenScreen';

type HouseDetailRouteProp = RouteProp<RootStackParamList, 'HouseDetail'>;

type Props = {
  route: HouseDetailRouteProp;
};

const Tab = createBottomTabNavigator();

const HouseDetailScreen: React.FC<Props> = ({ route }) => {
  const { id, name } = route.params;

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerTitle: `Nhà: ${name}`,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = '';

          if (route.name === 'Tất cả') iconName = 'home-automation';
          else if (route.name === 'Phòng ngủ') iconName = 'bed-double';
          else if (route.name === 'Bếp') iconName = 'fridge-outline';

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#007bff',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen
        name="Tất cả"
        component={AllDevicesScreen}
        initialParams={{ houseId: id }}
      />
      <Tab.Screen
        name="Phòng ngủ"
        component={BedroomScreen}
        initialParams={{ houseId: id }}
      />
      <Tab.Screen
        name="Bếp"
        component={KitchenScreen}
        initialParams={{ houseId: id }}
      />
    </Tab.Navigator>
  );
};

export default HouseDetailScreen;

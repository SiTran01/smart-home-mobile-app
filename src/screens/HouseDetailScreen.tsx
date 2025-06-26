// src/screens/HouseDetailScreen.tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../App';

import AllDevicesScreen from './AllDevicesScreen';
import BedroomScreen from './BedroomScreen';
import KitchenScreen from './KitchenScreen';

type HouseDetailRouteProp = RouteProp<RootStackParamList, 'HouseDetail'>;

type Props = {
  route: HouseDetailRouteProp;
};

const Tab = createBottomTabNavigator();

const HouseDetailScreen: React.FC<Props> = ({ route }) => {
  const { id, name } = route.params;

  return (
    <Tab.Navigator screenOptions={{ headerTitle: `Nhà: ${name}` }}>
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

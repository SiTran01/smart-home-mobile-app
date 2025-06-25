import React from 'react';
import { View, Text } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';

type RouteParams = {
  Bếp: { houseId: string };
};

const KitchenScreen = () => {
  const route = useRoute<RouteProp<RouteParams, 'Bếp'>>();
  const { houseId } = route.params;

  return (
    <View>
      <Text>Thiết bị trong Bếp - Nhà ID: {houseId}</Text>
    </View>
  );
};

export default KitchenScreen;

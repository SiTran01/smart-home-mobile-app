import React from 'react';
import { ScrollView, Text } from 'react-native';
import { useRoute } from '@react-navigation/native';

const AutomationScreen = () => {
  const route = useRoute<any>(); // 👈 bỏ qua kiểu tường minh
  const { houseId } = route.params || {};

  return (
    <ScrollView>
      <Text>Thiết bị trong Tất cả - Nhà ID: {houseId}</Text>
      
    </ScrollView>
  );
};

export default AutomationScreen;

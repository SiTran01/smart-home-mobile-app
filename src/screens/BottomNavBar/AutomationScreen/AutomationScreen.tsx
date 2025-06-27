import React, { useLayoutEffect, useCallback } from 'react';
import { ScrollView, Text } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import AutomationHeader from './components/Header/AutomationHeader';

const AutomationScreen = () => {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const { houseId } = route.params || {};

  const renderHeader = useCallback(() => (
    <AutomationHeader
      onAddAutomation={() => navigation.navigate('AddAutomation')}
    />
  ), [navigation]);

  useLayoutEffect(() => {
    navigation.setOptions({
      header: renderHeader,
    });
  }, [navigation, renderHeader]);

  return (
    <ScrollView>
      <Text>Automation Screen - Nhà ID: {houseId}</Text>
    </ScrollView>
  );
};

export default AutomationScreen;

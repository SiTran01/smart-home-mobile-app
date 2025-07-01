import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import UserCard from './components/UserCard/UserCard';
import ThisHome from './components/ThisHome/ThisHome';
import DashboardWidgets from './components/DashboardWidgets/DashboardWidgets';  
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import useUserStore from '../../../store/useUserStore';

import { RootStackParamList } from '../../../navigation/RootNavigator';

const ProfileScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  // Lấy user từ store hoặc context
  const user = useUserStore(state => state.user);

  const handlePressUserCard = () => {
    navigation.navigate('UserProfile');
  };

  const handlePressThisHome = (house: { id: string; name: string }) => {
    navigation.navigate('HouseOverview', {
      id: house.id,
      name: house.name,
    });
  };

  const handlePressDashboardItem = (item: { id: string; name: string }) => {
    console.log('Clicked:', item.name);
    // TODO: navigation.navigate(...) theo item.id nếu cần
  };

  if (!user) {
    // Có thể hiển thị loading hoặc message
    return null;
  }

  return (
    <ScrollView style={styles.container}>
      <UserCard user={user} onPress={handlePressUserCard} />
      <ThisHome onPress={handlePressThisHome} />
      <DashboardWidgets onPressItem={handlePressDashboardItem} />
      {/* Thêm các phần khác nếu cần */}
    </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 12,
  },
});

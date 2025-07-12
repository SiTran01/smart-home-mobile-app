import React from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import UserCard from './components/UserCard/UserCard';
import ThisHome from './components/ThisHome/ThisHome';
import DashboardWidgets from './components/DashboardWidgets/DashboardWidgets';

import useUserStore from '../../../store/useUserStore';
import useHomeStore from '../../../store/useHomeStore';
import { RootStackParamList } from '../../../navigation/RootNavigator';

const ProfileScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  // Lấy user từ store
  const user = useUserStore((state) => state.user);

  // Lấy selectedHome từ store
  const selectedHome = useHomeStore((state) => state.selectedHome());

  const handlePressUserCard = () => {
    navigation.navigate('UserProfile');
  };

  const handlePressThisHome = () => {
    if (!selectedHome) return;

    navigation.navigate('SettingHome', {
      id: selectedHome._id,
      name: selectedHome.name,
    });
  };

  const handlePressDashboardItem = (item: { id: string; name: string }) => {
    console.log('Clicked:', item.name);
    // TODO: navigation.navigate(...) theo item.id nếu cần
  };

  if (!user) {
    return (
      <View style={styles.centered}>
        <Text>Loading user...</Text>
      </View>
    );
  }

  if (!selectedHome) {
    return (
      <View style={styles.centered}>
        <Text>No Home Selected</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <UserCard user={user} onPress={handlePressUserCard} />

      <ThisHome
        name={selectedHome.name}
        rooms={selectedHome.rooms ? selectedHome.rooms.length : 0}
        members={(selectedHome.members?.length ?? 0) + 1} // +1 for owner
        onPress={handlePressThisHome}
      />

      <DashboardWidgets onPressItem={handlePressDashboardItem} />
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
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

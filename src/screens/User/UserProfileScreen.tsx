import React from 'react';
import { ScrollView, TouchableOpacity, Text, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useUserStore from '../../store/useUserStore';
import AvatarRow from './components/AvatarRow';
import NameRow from './components/NameRow';
import EmailRow from './components/EmailRow';
import TwitterRow from './components/TwitterRow';

const UserProfileScreen: React.FC = () => {
  const user = useUserStore(state => state.user);
  const setUser = useUserStore(state => state.setUser);

  const handleLogout = async () => {
    Alert.alert('Đăng xuất', 'Bạn có chắc muốn đăng xuất?', [
      { text: 'Hủy', style: 'cancel' },
      {
        text: 'Đăng xuất',
        style: 'destructive',
        onPress: async () => {
          await AsyncStorage.removeItem('token');
          setUser(null);
        },
      },
    ]);
  };

  if (!user) {
    return (
      <ScrollView contentContainerStyle={styles.centered}>
        <Text>Chưa đăng nhập</Text>
      </ScrollView>
    );
  }

  return (
    <ScrollView style={{ backgroundColor: '#fff' }}>
      <AvatarRow picture={user.picture} />
      <NameRow name={user.name} />
      <EmailRow email={user.email} />
      <TwitterRow />

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Đăng xuất</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default UserProfileScreen;

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutButton: {
    marginTop: 40,
    marginHorizontal: 20,
    backgroundColor: '#e53935',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

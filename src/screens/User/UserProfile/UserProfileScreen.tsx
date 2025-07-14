import React from 'react';
import { ScrollView, TouchableOpacity, Text, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import useUserStore from '../../../store/useUserStore';

import { resetAllStores } from '../../../store/resetAllStores'; // 🆕 import hàm reset

import AvatarRow from './components/AvatarRow';
import NameRow from './components/NameRow';
import EmailRow from './components/EmailRow';
import TwitterRow from './components/TwitterRow';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

import socket from '../../../services/socket/socket';


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
        try {
          await GoogleSignin.configure({
            webClientId: '1078806341508-9kmi0bvogdtv7g8uokpm4bv9bmpdusck.apps.googleusercontent.com',
            offlineAccess: true,
          });
          
          await GoogleSignin.signOut(); // ✅ clear Google account cache
          await AsyncStorage.removeItem('token');
          setUser(null);

          resetAllStores(); // 🔥 reset toàn bộ stores về initial state

          // 🔌 Disconnect socket khi logout
          if (socket.connected) {
            socket.disconnect();
            console.log('🔌 [Logout] Socket disconnected');
          }

        } catch (error) {
          console.error('❌ Logout error:', error);
        }
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

import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import InviteEmailAliasInput from './components/InviteEmailAliasInput';
import MemberRoleSelector from './components/MemberRoleSelector';
import InviteMessageInput from './components/InviteMessageInput';
import { inviteMember } from '../../../services/api/inviteMemberApi';
import { useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../../navigation/RootNavigator';

type RouteProps = RouteProp<RootStackParamList, 'InviteMember'>;

const InviteMemberScreen = () => {
  const route = useRoute<RouteProps>();
  const { homeId } = route.params; // 🆕 nhận homeId từ route params

  const [email, setEmail] = useState('');
  const [alias, setAlias] = useState('');
  const [role, setRole] = useState<'member' | 'admin'>('member');
  const [message, setMessage] = useState('');

  const handleSendInvite = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        Alert.alert('Lỗi', 'Bạn chưa đăng nhập');
        return;
      }

      const data = {
        homeId,
        email,
        alias,
        role,
        message,
      };

      const res = await inviteMember(token, data);
      console.log('✅ Gửi lời mời thành công:', res);
      Alert.alert('Thành công', 'Đã gửi lời mời thành viên');
    } catch (err) {
      console.error('❌ Lỗi gửi lời mời:', err);
      Alert.alert('Lỗi', 'Không thể gửi lời mời');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <InviteEmailAliasInput
        email={email}
        onEmailChange={setEmail}
        alias={alias}
        onAliasChange={setAlias}
      />

      <MemberRoleSelector
        selectedRole={role}
        onSelectRole={setRole}
      />

      <InviteMessageInput
        message={message}
        onMessageChange={setMessage}
      />

      <View style={styles.buttonContainer}>
        <Button title="Gửi lời mời" onPress={handleSendInvite} />
      </View>
    </ScrollView>
  );
};

export default InviteMemberScreen;

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  buttonContainer: {
    marginTop: 24,
  },
});

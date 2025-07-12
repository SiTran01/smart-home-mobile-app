import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Alert } from 'react-native';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { RootStackParamList } from '../../../navigation/RootNavigator';
import HeaderHomeInfo from './components/HomeInfo';
import SettingHomeOptionRow from './components/SettingOptionRow';
import DeleteHomeButton from './components/DeleteHomeButton';
import RenameHomeModal from './components/RenameHomeModal';
import MembersList, { Member } from './components/MembersList';

import { updateHome } from '../../../services/api/homeApi';
import { fetchUserById } from '../../../services/api/authApi';
import useHomeStore from '../../../store/useHomeStore';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type SettingHomeRouteProp = RouteProp<RootStackParamList, 'SettingHome'>;

const SettingHomeScreen: React.FC = () => {
  const route = useRoute<SettingHomeRouteProp>();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const { id, name } = route.params;

  const [showRenameModal, setShowRenameModal] = useState(false);
  const [homeName, setHomeName] = useState(name);
  const [memberList, setMemberList] = useState<Member[]>([]);

  const { homes, updateHome: updateHomeInStore } = useHomeStore();
  const currentHome = homes.find(home => home._id === id);

  const roomsCount = currentHome?.rooms?.length ?? 0;
  const devicesCount = currentHome?.devices?.length ?? 0;
  const membersCount = (currentHome?.members?.length ?? 0) + 1;

  useEffect(() => {
    const loadMembers = async () => {
      if (!currentHome) return;

      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) return;

        const ownerRes = await fetchUserById(token, currentHome.owner!);
        const owner: Member = {
          _id: ownerRes._id,
          name: ownerRes.name,
          role: 'owner',
          avatarUrl: ownerRes.picture,
        };

        const memberPromises = (currentHome.members || []).map(async (m) => {
          const userRes = await fetchUserById(token, m.user);
          return {
            _id: userRes._id,
            name: userRes.name,
            role: m.role,
            avatarUrl: userRes.picture,
          } as Member;
        });

        const members = await Promise.all(memberPromises);
        setMemberList([owner, ...members]);
      } catch (err) {
        console.error('❌ Error fetching members:', err);
      }
    };

    loadMembers();
  }, [currentHome]);

  const handleRename = async (newName: string) => {
    if (!newName || newName === homeName) {
      setShowRenameModal(false);
      return;
    }

    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        Alert.alert('Lỗi', 'Bạn chưa đăng nhập');
        return;
      }

      const updatedHome = await updateHome(token, id, { name: newName });
      updateHomeInStore(updatedHome);
      setHomeName(updatedHome.name);

      Alert.alert('Thành công', `Đã đổi tên thành "${updatedHome.name}"`);
    } catch (error) {
      console.error('❌ Rename home error:', error);
      Alert.alert('Lỗi', 'Không thể đổi tên nhà');
    } finally {
      setShowRenameModal(false);
    }
  };

  const handleInviteMember = () => {
    navigation.navigate('InviteMember', { homeId: id });
  };

  return (
    <ScrollView style={styles.container}>
      <HeaderHomeInfo
        name={homeName}
        rooms={roomsCount}
        members={membersCount}
      />

      <SettingHomeOptionRow
        label="Tên"
        value={homeName}
        onPress={() => setShowRenameModal(true)}
      />

      <SettingHomeOptionRow
        label="Quản lý phòng"
        value={`${roomsCount}`}
        onPress={() => navigation.navigate('ManageRoom', { homeId: id })}
      />

      <SettingHomeOptionRow
        label="Thiết bị"
        value={`${devicesCount}`}
        onPress={() => {}}
      />

      <RenameHomeModal
        visible={showRenameModal}
        currentName={homeName}
        onClose={() => setShowRenameModal(false)}
        onSave={handleRename}
      />

      <MembersList
        members={memberList}
        currentUserId="1" // TODO: thay id người login thật
        onInvitePress={handleInviteMember} // 🆕 pass navigate callback
      />

      <DeleteHomeButton id={id} name={homeName} />
    </ScrollView>
  );
};

export default SettingHomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 24,
  },
});

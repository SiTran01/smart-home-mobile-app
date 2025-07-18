import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Alert } from 'react-native';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';

import { RootStackParamList } from '../../../navigation/RootNavigator';
import HeaderHomeInfo from './components/HomeInfo';
import SettingHomeOptionRow from './components/SettingOptionRow';
import DeleteHomeButton from './components/DeleteHomeButton';
import RenameHomeModal from './components/RenameHomeModal';
import MembersList, { Member } from './components/MembersList';

import { updateHome, deleteHome } from '../../../services/api/homeApi';
import useHomeStore from '../../../store/useHomeStore';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import useUserStore from '../../../store/useUserStore';
import AsyncStorage from '@react-native-async-storage/async-storage';


type SettingHomeRouteProp = RouteProp<RootStackParamList, 'SettingHome'>;

const SettingHomeScreen: React.FC = () => {
  const route = useRoute<SettingHomeRouteProp>();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const { id, name } = route.params;
  const { user } = useUserStore();

  const [showRenameModal, setShowRenameModal] = useState(false);
  const [homeName, setHomeName] = useState(name);
  const [memberList, setMemberList] = useState<Member[]>([]);

  const { homes, updateHome: updateHomeInStore, deleteHome: removeHomeFromStore } = useHomeStore();
  const currentHome = homes.find(home => home._id === id);

  const roomsCount = currentHome?.rooms?.length ?? 0;
  const devicesCount = currentHome?.devices?.length ?? 0;
  const membersCount = (currentHome?.members?.length ?? 0) + 1;

  useEffect(() => {
    if (!currentHome) return;

    // ✅ Build member list từ dữ liệu store (đã populate)
    const owner: Member = {
      _id: (currentHome.owner as any)._id,
      name: (currentHome.owner as any).name,
      role: 'owner',
      avatarUrl: (currentHome.owner as any).picture,
    };

    const members: Member[] = (currentHome.members || []).map((m) => ({
      _id: (m.user as any)._id,
      name: (m.user as any).name,
      role: m.role,
      avatarUrl: (m.user as any).picture,
    }));

    setMemberList([owner, ...members]);
  }, [currentHome]);

  const handleRename = async (newName: string) => {
    if (!newName || newName === homeName) {
      setShowRenameModal(false);
      return;
    }

    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        Alert.alert('Lỗi', 'Không tìm thấy token, vui lòng đăng nhập lại.');
        return;
      }

      const updatedHome = await updateHome(token, id, {
        name: newName,
        updateType: 'rename',
      });
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

  const handleDeleteHome = async (homeId: string) => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        Alert.alert('Lỗi', 'Không tìm thấy token, vui lòng đăng nhập lại.');
        return;
      }

      await deleteHome(token, homeId);
      removeHomeFromStore(homeId);

      Alert.alert('Thành công', `Đã xóa gia đình "${homeName}"`);
      navigation.goBack();
    } catch (error) {
      console.error('❌ deleteHome error:', error);
      Alert.alert('Lỗi', 'Không thể xóa gia đình');
    }
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
        currentUserId={user._id}
        onMemberPress={(memberId) => navigation.navigate('MemberProfile', { memberId })}
        onInvitePress={handleInviteMember}
      />

      <DeleteHomeButton
        id={id}
        name={homeName}
        onDelete={handleDeleteHome}
      />
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

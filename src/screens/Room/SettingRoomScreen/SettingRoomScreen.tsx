import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { RootStackParamList } from '../../../navigation/RootNavigator';
import useHomeStore from '../../../store/useHomeStore';
import SettingOptionRow from './components/SettingOptionRow';
import RenameRoomModal from './components/RenameRoomModal';
import DeleteRoomButton from './components/DeleteRoomButton';
import { updateRoom as updateRoomApi, deleteRoom as deleteRoomApi } from '../../../services/api/roomApi';

type SettingRoomRouteProp = RouteProp<RootStackParamList, 'SettingRoom'>;

const SettingRoomScreen: React.FC = () => {
  const route = useRoute<SettingRoomRouteProp>();
  const navigation = useNavigation();
  const { roomId } = route.params;

  const { homes, updateRoomInHome, deleteRoomFromHome } = useHomeStore();

  // 🔎 Tìm room từ store
  const room = homes
    .flatMap(h => h.rooms ?? [])
    .find(r => r._id === roomId);

  const [renameModalVisible, setRenameModalVisible] = useState(false);

  const getToken = async (): Promise<string | null> => {
    const token = await AsyncStorage.getItem('token');
    if (!token) {
      Alert.alert('Lỗi', 'Bạn chưa đăng nhập');
    }
    return token;
  };

  const handleSaveNewName = async (newName: string) => {
    if (!newName || !room) return;

    const token = await getToken();
    if (!token) return;

    try {
      const updatedRoom = await updateRoomApi(token, room._id, { name: newName });
      console.log('[SettingRoomScreen] updateRoomApi response:', updatedRoom);

      const homeId = homes.find(h => h.rooms?.some(r => r._id === room._id))?._id;
      if (homeId) {
        updateRoomInHome(homeId, updatedRoom);
      }

      Alert.alert('Thành công', 'Đã đổi tên phòng');
    } catch (error) {
      console.error('Error updating room name:', error);
      Alert.alert('Lỗi', 'Không thể đổi tên phòng');
    } finally {
      setRenameModalVisible(false);
    }
  };

  const handleDeleteRoom = async () => {
    if (!room) return;

    const token = await getToken();
    if (!token) return;

    try {
      await deleteRoomApi(token, room._id);
      console.log('[SettingRoomScreen] deleted room id:', room._id);

      const homeId = homes.find(h => h.rooms?.some(r => r._id === room._id))?._id;
      if (homeId) {
        deleteRoomFromHome(homeId, room._id);
      }

      Alert.alert('Thành công', `Đã xóa phòng "${room.name}"`);
      navigation.goBack();
    } catch (error) {
      console.error('Error deleting room:', error);
      Alert.alert('Lỗi', 'Không thể xóa phòng');
    }
  };

  if (!room) {
    return (
      <View style={styles.container}>
        <SettingOptionRow label="Tên phòng" value="Không tìm thấy phòng" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <SettingOptionRow
        label="Tên phòng"
        value={room.name}
        onPress={() => setRenameModalVisible(true)}
      />
      <SettingOptionRow
        label="Khu vực"
        value={room.area || 'Chưa có'}
        onPress={() => {}} // TODO: Implement edit area if needed
      />

      <DeleteRoomButton
        name={room.name}
        onDelete={handleDeleteRoom}
      />

      <RenameRoomModal
        visible={renameModalVisible}
        currentName={room.name}
        onClose={() => setRenameModalVisible(false)}
        onSave={handleSaveNewName}
      />
    </View>
  );
};

export default SettingRoomScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

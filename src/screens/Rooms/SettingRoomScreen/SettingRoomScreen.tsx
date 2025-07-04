import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { RootStackParamList } from '../../../navigation/RootNavigator';
import useRoomStore from '../../../store/useRoomStore';
import SettingOptionRow from './components/SettingOptionRow';
import RenameRoomModal from './components/RenameRoomModal';
import DeleteRoomButton from './components/DeleteRoomButton';
import { updateRoom as updateRoomApi, deleteRoom as deleteRoomApi } from '../../../services/api/roomApi';

type SettingRoomRouteProp = RouteProp<RootStackParamList, 'SettingRoom'>;

const SettingRoomScreen: React.FC = () => {
  const route = useRoute<SettingRoomRouteProp>();
  const navigation = useNavigation();
  const { roomId } = route.params;

  const { rooms, updateRoom, deleteRoom } = useRoomStore();
  const room = rooms.find(r => r._id === roomId);

  const [renameModalVisible, setRenameModalVisible] = useState(false);

  const handleSaveNewName = async (newName: string) => {
    if (!newName || !room) return;

    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        Alert.alert('Lỗi', 'Bạn chưa đăng nhập');
        return;
      }

      const updatedRoom = await updateRoomApi(token, room._id, { name: newName });
      updateRoom(updatedRoom);
    } catch (error) {
      console.error('Error updating room name:', error);
      Alert.alert('Lỗi', 'Không thể đổi tên phòng');
    } finally {
      setRenameModalVisible(false);
    }
  };

  const handleDeleteRoom = async () => {
    if (!room) return;

    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        Alert.alert('Lỗi', 'Bạn chưa đăng nhập');
        return;
      }

      await deleteRoomApi(token, room._id);
      deleteRoom(room._id); // xóa khỏi store
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
      <SettingOptionRow label="Khu vực" value={room.location || 'Chưa có'} onPress={() => {}} />
      <SettingOptionRow label="Loại phòng" value={room.type || 'Chưa có'} onPress={() => {}} />

      <View style={styles.section}>
        <SettingOptionRow
          label="Phụ kiện"
          value={`${room.devices?.length || 0}`}
          onPress={() => {}}
        />
      </View>

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
  section: {
    marginTop: 12,
  },
});

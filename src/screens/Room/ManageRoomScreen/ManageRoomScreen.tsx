import React, { useLayoutEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import useHomeStore from '../../../store/useHomeStore';
import { RootStackParamList } from '../../../navigation/RootNavigator';

import RoomCard from './components/RoomCard';
import CreateNewRoomModal from './components/CreateNewRoomModal';
import { createRoom, deleteRoom } from '../../../services/api/roomApi';

const ManageRoomScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute();
  const { homeId } = route.params as { homeId: string };

  const { homes, addRoomToHome, deleteRoomFromHome } = useHomeStore();
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const currentHome = homes.find(h => h._id === homeId);

  const handleAddRoom = async (roomName: string) => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        Alert.alert('Lỗi', 'Bạn chưa đăng nhập');
        return;
      }

      const newRoom = await createRoom(token, { name: roomName, homeId });
      console.log('[ManageRoomScreen] createRoom response:', newRoom);

      // ✅ Update HomeStore chỉ thêm room mới
      addRoomToHome(homeId, newRoom);
    } catch (error) {
      console.error('❌ Error creating room:', error);
      Alert.alert('Lỗi', 'Không thể tạo phòng mới');
    } finally {
      setLoading(false);
      setModalVisible(false);
    }
  };

  const handleDeleteRoom = async (roomId: string) => {
    Alert.alert('Xoá phòng', 'Bạn có chắc chắn muốn xoá phòng này?', [
      { text: 'Huỷ', style: 'cancel' },
      {
        text: 'Xoá',
        style: 'destructive',
        onPress: async () => {
          setLoading(true);
          try {
            const token = await AsyncStorage.getItem('token');
            if (!token) {
              Alert.alert('Lỗi', 'Bạn chưa đăng nhập');
              return;
            }

            await deleteRoom(token, roomId);
            deleteRoomFromHome(homeId, roomId);
          } catch (error) {
            console.error('❌ Error deleting room:', error);
            Alert.alert('Lỗi', 'Không thể xoá phòng');
          } finally {
            setLoading(false);
          }
        },
      },
    ]);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity onPress={() => console.log('Sort rooms')}>
            <Ionicons name="filter" size={24} color="black" style={{ marginRight: 16 }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Ionicons name="add" size={28} color="black" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);

  const renderItem = ({ item }: { item: typeof currentHome.rooms[0] }) => (
    <RoomCard
      name={item.name}
      onPress={() => navigation.navigate('SettingRoom', { roomId: item._id })}
      onDelete={() => handleDeleteRoom(item._id)}
    />
  );

  return (
    <View style={styles.container}>
      {loading && <ActivityIndicator size="large" color="green" />}

      {currentHome && currentHome.rooms && currentHome.rooms.length > 0 ? (
        <FlatList
          data={currentHome.rooms}
          keyExtractor={(item) => item._id}
          renderItem={renderItem}
        />
      ) : (
        <Text style={styles.emptyText}>Chưa có phòng nào trong home này</Text>
      )}

      <CreateNewRoomModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onAddRoom={handleAddRoom}
      />
    </View>
  );
};

export default ManageRoomScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 32,
    color: '#888',
  },
});

import React, { useLayoutEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import useRoomStore from '../../../store/useRoomStore';
import { RootStackParamList } from '../../../navigation/RootNavigator';
import RoomCard from './components/RoomCard';
import CreateNewRoomModal from './components/CreateNewRoomModal';
import { createRoom } from '../../../services/api/roomApi';

const ManageRoomScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute();
  const { homeId } = route.params as { homeId: string };

  const { rooms, addRoom } = useRoomStore();

  const filteredRooms = rooms.filter(room => room.home === homeId);

  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  // ✅ Handle add room
  const handleAddRoom = async (roomName: string) => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('token');

      if (!token) {
        Alert.alert('Lỗi', 'Bạn chưa đăng nhập');
        return;
      }

      const newRoom = await createRoom(token, { name: roomName, homeId: homeId });
      addRoom(newRoom);
    } catch (error) {
      console.error('Error creating room:', error);
      Alert.alert('Lỗi', 'Không thể tạo phòng mới');
    } finally {
      setLoading(false);
    }
  };

  // ✅ Setup headerRight
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

  const renderItem = ({ item }: { item: typeof rooms[0] }) => (
    <RoomCard
      name={item.name}
      onPress={() => navigation.navigate('SettingRoom', { roomId: item._id })}
    />
  );

  return (
    <View style={styles.container}>
      {loading && <ActivityIndicator size="large" color="green" />}

      <FlatList
        data={filteredRooms}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Chưa có phòng nào trong home này</Text>
        }
      />

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

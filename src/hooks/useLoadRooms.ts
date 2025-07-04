import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { getAllRooms } from '../services/api/roomApi';
import useRoomStore from '../store/useRoomStore';
import useHomeStore from '../store/useHomeStore';

const useLoadRooms = () => {
  const setRooms = useRoomStore((state) => state.setRooms);
  const selectedHome = useHomeStore((state) => state.selectedHome());

 useEffect(() => {
  const fetchRooms = async () => {
    if (!selectedHome) {
      console.log('🏠 [useLoadRooms] No selected home to load rooms for');
      setRooms([]);
      return;
    }

    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        console.log('🔑 [useLoadRooms] No token found');
        return;
      }

      console.log('📥 [useLoadRooms] Loading rooms for home:', selectedHome._id);
      const rooms = await getAllRooms(token, selectedHome._id);
      console.log('✅ [useLoadRooms] Rooms loaded:', rooms);
      setRooms(rooms);
    } catch (error) {
      console.error('❌ [useLoadRooms] Failed to load rooms:', error);
    }
  };

  fetchRooms();
}, [selectedHome, setRooms]);
};

export default useLoadRooms;

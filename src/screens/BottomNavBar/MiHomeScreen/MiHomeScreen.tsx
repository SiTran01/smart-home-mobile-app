import React, { useLayoutEffect, useCallback, useEffect, useState } from 'react';
import { ScrollView, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import MiHomeHeader from './components/Header/MiHomeHeader';
import HouseDropdownModal from './components/Header/components/HouseDropdownModal';
import PlusMenuModal from './components/Header/components/PlusMenuModal';
import MiHomeBody from './components/Body/MiHomeBody';

import useHomeStore from '../../../store/useHomeStore';
import useDeviceStore from '../../../store/useDeviceStore';
import useRoomStore from '../../../store/useRoomStore';

import { Home } from '../../../services/api/homeApi';
import { getAllRooms } from '../../../services/api/roomApi';
import { getAllDevices } from '../../../services/api/deviceApi';

const MiHomeScreen = () => {
  const navigation = useNavigation<any>();

  const { homes, selectedHomeId, setSelectedHomeId } = useHomeStore();
  const { devices, setDevices } = useDeviceStore();
  const { rooms, setRooms } = useRoomStore();

  const selectedHouse = homes.find(h => h._id === selectedHomeId) || null;

  const [showDropdown, setShowDropdown] = useState(false);
  const [showPlusMenu, setShowPlusMenu] = useState(false);
  const [loading, setLoading] = useState(false);

  // Khởi tạo selectedHomeId nếu chưa có
  useEffect(() => {
  const loadSelectedHomeId = async () => {
    const savedHomeId = await AsyncStorage.getItem('selectedHomeId');
    console.log('[MiHomeScreen] Loaded saved selectedHomeId:', savedHomeId);
    if (savedHomeId) {
      setSelectedHomeId(savedHomeId);
    }
  };

  loadSelectedHomeId();
}, [setSelectedHomeId]);


  // Load rooms & devices mỗi khi selectedHomeId đổi
  useEffect(() => {
    const fetchRoomsAndDevices = async () => {
      if (!selectedHomeId) return;

      setLoading(true);
      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
          console.log('[MiHomeScreen] No token found');
          return;
        }

        // Load Rooms
        console.log('[MiHomeScreen] Loading rooms for home:', selectedHomeId);
        const roomsData = await getAllRooms(token, selectedHomeId);
        setRooms(roomsData);
        console.log('[MiHomeScreen] Rooms loaded:', roomsData);

        // Load Devices
        console.log('[MiHomeScreen] Loading devices for home:', selectedHomeId);
        const devicesData = await getAllDevices(token, selectedHomeId);
        setDevices(devicesData);
        console.log('[MiHomeScreen] Devices loaded:', devicesData);

      } catch (error) {
        console.error('[MiHomeScreen] Failed to load rooms or devices:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRoomsAndDevices();
  }, [selectedHomeId, setRooms, setDevices]);

  //header------------
  const renderHeader = useCallback(() => (
    <MiHomeHeader
      selectedHouseName={selectedHouse?.name || 'Chọn nhà'}
      onHousePress={() => setShowDropdown(true)}
      onOpenNotifications={() => navigation.navigate('Notifications')}
      onPlusPress={() => setShowPlusMenu(true)}
    />
  ), [navigation, selectedHouse]);

  useLayoutEffect(() => {
    navigation.setOptions({
      header: renderHeader,
    });
  }, [navigation, renderHeader]);

  const handleHouseSelect = (house: Home) => {
    setSelectedHomeId(house._id);
    setShowDropdown(false);
  };

  const filteredDevices = devices.filter(device => device.home === selectedHomeId);

  return (
    <>
      {loading ? (
        <ActivityIndicator size="large" color="green" style={{ marginTop: 32 }} />
      ) : (
        <ScrollView style={styles.container}>
          <Text style={styles.sectionTitle}>
            Thiết bị trong Tất cả - Nhà ID: {selectedHouse?._id}
          </Text>

          <MiHomeBody devices={filteredDevices} />

          <Text style={styles.sectionTitle}>Danh sách Home</Text>
          {homes.map((home, index) => (
            <Text key={home._id || index}>
              Nhà {index + 1} - {home.name}
            </Text>
          ))}
        </ScrollView>
      )}

      <HouseDropdownModal
        visible={showDropdown}
        houses={homes}
        onSelect={handleHouseSelect}
        onClose={() => setShowDropdown(false)}
        onManageRoomsPress={() => {
          setShowDropdown(false);
          if (selectedHouse) {
            navigation.navigate('ManageRoom', { homeId: selectedHouse._id });
          }
        }}
        onManagePress={() => {
          setShowDropdown(false);
          navigation.navigate('ManageHouses');
        }}
      />

      <PlusMenuModal
        visible={showPlusMenu}
        onClose={() => setShowPlusMenu(false)}
        onAddDevice={() => {
          setShowPlusMenu(false);
          navigation.navigate('AddDevice');
        }}
        onScan={() => {
          setShowPlusMenu(false);
          // TODO: navigate to Scan screen
        }}
        onCreateSmartScene={() => {
          setShowPlusMenu(false);
          // TODO: navigate to Smart Scene creation screen
        }}
      />
    </>
  );
};

export default MiHomeScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
  },
  sectionTitle: {
    marginTop: 16,
    fontSize: 16,
    fontWeight: '600',
  },
});

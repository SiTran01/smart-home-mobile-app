import React, { useLayoutEffect, useCallback, useEffect } from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

import MiHomeHeader from './components/Header/MiHomeHeader';
import HouseDropdownModal from './components/Header/components/HouseDropdownModal';
import PlusMenuModal from './components/Header/components/PlusMenuModal';

import useHomeStore from '../../../store/useHomeStore';
import useDeviceStore from '../../../store/useDeviceStore';
import { Home } from '../../../services/api/homeApi';
import MiHomeBody from './components/Body/MiHomeBody';

const MiHomeScreen = () => {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();

  const { homes, selectedHomeId, setSelectedHomeId } = useHomeStore();
  const { devices } = useDeviceStore();

  const selectedHouse = homes.find(h => h._id === selectedHomeId) || null;

  const [showDropdown, setShowDropdown] = React.useState(false);
  const [showPlusMenu, setShowPlusMenu] = React.useState(false);

  useEffect(() => {
    if (homes.length === 0) {
      setSelectedHomeId(null);
    } else if (!selectedHouse) {
      setSelectedHomeId(homes[0]._id);
    }
  }, [homes, selectedHouse, setSelectedHomeId]);

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
      <ScrollView style={styles.container}>
        <Text style={styles.sectionTitle}>Thiết bị trong Tất cả - Nhà ID: {selectedHouse?._id}</Text>

        <MiHomeBody devices={filteredDevices} />

        <Text style={styles.sectionTitle}>Danh sách Home</Text>
        {homes.map((home, index) => (
          <Text key={home._id || index}>
            Nhà {index + 1} - {home.name}
          </Text>
        ))}
      </ScrollView>

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

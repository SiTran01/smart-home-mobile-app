import React, { useLayoutEffect, useState } from 'react';
import { ScrollView, Text } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

import TopBar from './components/TopBar/TopBar';
import HouseDropdownModal from './components/TopBar/components/HouseDropdownModal';
import PlusMenuModal from './components/TopBar/components/PlusMenuModal';

const houses = [
  { id: '1', name: 'Nhà A' },
  { id: '2', name: 'Nhà B' },
  { id: '3', name: 'Nhà C' },
  { id: '4', name: 'Nhà D' },
];

const MiHomeScreen = () => {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();

  const { houseId } = route.params || {};
  const [selectedHouse, setSelectedHouse] = useState(houses[0]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showPlusMenu, setShowPlusMenu] = useState(false);

  // ⚡️ Update header to include TopBar
  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => (
        <TopBar
          selectedHouseName={selectedHouse.name}
          onHousePress={() => setShowDropdown(true)}
          onOpenNotifications={() => navigation.navigate('Notifications')}
          onPlusPress={() => setShowPlusMenu(true)}
        />
      ),
    });
  }, [navigation, selectedHouse]);

  const handleHouseSelect = (house: typeof selectedHouse) => {
    setSelectedHouse(house);
    setShowDropdown(false);
  };

  return (
    <>
      <ScrollView>
        <Text>Thiết bị trong Tất cả - Nhà ID: {houseId}</Text>
        {[...Array(20)].map((_, i) => (
          <Text key={i}>Thiết bị {i + 1} - {selectedHouse.name}</Text>
        ))}
      </ScrollView>

      <HouseDropdownModal
        visible={showDropdown}
        houses={houses}
        onSelect={handleHouseSelect}
        onClose={() => setShowDropdown(false)}
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

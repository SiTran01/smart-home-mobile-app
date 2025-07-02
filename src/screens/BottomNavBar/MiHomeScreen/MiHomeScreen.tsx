import React, { useLayoutEffect, useCallback, useState, useEffect } from 'react';
import { ScrollView, Text } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

import TopBar from './components/TopBar/MiHomeHeader';
import HouseDropdownModal from './components/TopBar/components/HouseDropdownModal';
import PlusMenuModal from './components/TopBar/components/PlusMenuModal';

import useHomeStore from '../../../store/useHomeStore';
import { Home } from '../../../services/homeApi/homeApi';

const MiHomeScreen = () => {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();

  const { homes } = useHomeStore(); // ✅ lấy homes từ store

  const [selectedHouse, setSelectedHouse] = useState<Home | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showPlusMenu, setShowPlusMenu] = useState(false);

  // ✅ set selectedHouse mặc định khi homes thay đổi
  useEffect(() => {
    if (homes.length > 0 && !selectedHouse) {
      setSelectedHouse(homes[0]);
    }
  }, [homes, selectedHouse]);

  const renderHeader = useCallback(() => (
    <TopBar
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
    setSelectedHouse(house);
    setShowDropdown(false);
  };

  return (
    <>
      <ScrollView>
        <Text>Thiết bị trong Tất cả - Nhà ID: {selectedHouse?._id}</Text>
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

import React, { useLayoutEffect, useCallback, useEffect } from 'react';
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

  const { homes, selectedHomeId, setSelectedHomeId } = useHomeStore();

  const selectedHouse = homes.find(h => h._id === selectedHomeId) || null;

  const [showDropdown, setShowDropdown] = React.useState(false);
  const [showPlusMenu, setShowPlusMenu] = React.useState(false);

  // ✅ Khi homes thay đổi ➔ đảm bảo selectedHomeId hợp lệ
  useEffect(() => {
    if (homes.length === 0) {
      setSelectedHomeId(null);
    } else if (!selectedHouse) {
      setSelectedHomeId(homes[0]._id);
    }
  }, [homes, selectedHouse, setSelectedHomeId]);

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
    setSelectedHomeId(house._id);
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

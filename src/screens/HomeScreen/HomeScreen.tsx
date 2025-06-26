import React, { useLayoutEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { RootStackParamList } from '../../../App';
import AllDevicesScreen from '../BottomNavBar/AllDevicesScreen';
import BedroomScreen from '../BottomNavBar/BedroomScreen';
import KitchenScreen from '../BottomNavBar/KitchenScreen';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const houses = [
  { id: '1', name: 'Nhà A' },
  { id: '2', name: 'Nhà B' },
  { id: '3', name: 'Nhà C' },
  { id: '4', name: 'Nhà D' },
];

const Tab = createBottomTabNavigator();

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const [selectedHouse, setSelectedHouse] = useState(houses[0]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showPlusMenu, setShowPlusMenu] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <TouchableOpacity onPress={() => setShowDropdown(true)}>
          <Text style={styles.dropdownButton}>
            {selectedHouse.name} ⌄
          </Text>
        </TouchableOpacity>
      ),
      headerRight: () => (
        <View style={styles.headerIcons}>
          <TouchableOpacity
            style={styles.iconCircle}
            onPress={() => navigation.navigate('Notifications')}
          >
            <Icon name="bell-outline" size={18} color="#007bff" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.iconCircle}
            onPress={() => setShowPlusMenu(true)}
          >
            <Icon name="plus" size={18} color="#007bff" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation, selectedHouse]);

  const handleHouseSelect = (house: typeof selectedHouse) => {
    setSelectedHouse(house);
    setShowDropdown(false);
  };

  return (
    <View style={styles.container}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ color, size }) => {
            let iconName = '';
            if (route.name === 'Tất cả') iconName = 'home-automation';
            else if (route.name === 'Phòng ngủ') iconName = 'bed-double';
            else if (route.name === 'Bếp') iconName = 'fridge-outline';
            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#007bff',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen
          name="Tất cả"
          children={() => <AllDevicesScreen houseId={selectedHouse.id} />}
        />
        <Tab.Screen
          name="Phòng ngủ"
          children={() => <BedroomScreen houseId={selectedHouse.id} />}
        />
        <Tab.Screen
          name="Bếp"
          children={() => <KitchenScreen houseId={selectedHouse.id} />}
        />
      </Tab.Navigator>

      {/* Dropdown chọn nhà */}
      <Modal visible={showDropdown} transparent animationType="fade">
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowDropdown(false)}
        >
          <View style={styles.dropdownWrapper}>
            <View style={styles.dropdown}>
              {houses.map((house) => (
                <TouchableOpacity
                  key={house.id}
                  onPress={() => handleHouseSelect(house)}
                  style={styles.dropdownItem}
                >
                  <Text>{house.name}</Text>
                </TouchableOpacity>
              ))}

              <TouchableOpacity
                onPress={() => {
                  setShowDropdown(false);
                  navigation.navigate('ManageHouses');
                }}
                style={[
                  styles.dropdownItem,
                  { borderTopWidth: 1, borderTopColor: '#ccc' },
                ]}
              >
                <Text style={styles.manageText}>🛠️ Quản lý nhà</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Popup menu dấu cộng */}
      <Modal visible={showPlusMenu} transparent animationType="fade">
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowPlusMenu(false)}
        >
          <View style={styles.plusMenuWrapper}>
            <View style={styles.plusMenu}>
              <TouchableOpacity
                style={styles.plusMenuItem}
                onPress={() => {
                  setShowPlusMenu(false);
                  navigation.navigate('AddDevice');
                  console.log('➕ Thêm thiết bị');
                  // navigation.navigate('AddDevice');
                }}
              >
                <Text>➕ Thêm thiết bị</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.plusMenuItem}
                onPress={() => {
                  setShowPlusMenu(false);
                  console.log('📷 Quét mã');
                  // navigation.navigate('QRCodeScanner');
                }}
              >
                <Text>📷 Quét</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.plusMenuItem}
                onPress={() => {
                  setShowPlusMenu(false);
                  console.log('🧠 Tạo tình huống thông minh');
                  // navigation.navigate('SmartScene');
                }}
              >
                <Text>🧠 Tạo tình huống thông minh</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  dropdownButton: {
    fontSize: 18,
    fontWeight: '500',
    color: '#007bff',
  },
  headerIcons: {
    flexDirection: 'row',
    marginRight: 10,
  },
  iconCircle: {
    marginHorizontal: 6,
    borderWidth: 1,
    borderColor: '#007bff',
    borderRadius: 12,
    padding: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  dropdownWrapper: {
    position: 'absolute',
    top: 60,
    left: 16,
  },
  dropdown: {
    width: 200,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 8,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
  },
  dropdownItem: {
    padding: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc',
  },
  manageText: {
    fontWeight: '600',
    color: '#1a53ff',
  },
  plusMenuWrapper: {
    position: 'absolute',
    top: 50,
    right: 10,
  },
  plusMenu: {
    width: 220,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 8,
    elevation: 6,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
  },
  plusMenuItem: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc',
  },
});

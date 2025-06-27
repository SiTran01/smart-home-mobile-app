import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface Props {
  selectedHouseName: string;
  onSelectHouse: () => void;
  onOpenNotifications: () => void;
  onOpenPlusMenu: () => void;
}

const HouseHeader: React.FC<Props> = ({
  selectedHouseName,
  onSelectHouse,
  onOpenNotifications,
  onOpenPlusMenu,
}) => {
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={onSelectHouse}>
        <Text style={styles.dropdownButton}>{selectedHouseName} ⌄</Text>
      </TouchableOpacity>

      <View style={styles.headerIcons}>
        <TouchableOpacity style={styles.iconCircle} onPress={onOpenNotifications}>
          <Icon name="bell-outline" size={20} color="#007bff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconCircle} onPress={onOpenPlusMenu}>
          <Icon name="plus" size={20} color="#007bff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HouseHeader;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff', // Màu nền trắng sang trọng
    paddingHorizontal: 16,
    paddingVertical: 12,
    elevation: 4, // Đổ bóng Android
    shadowColor: '#000', // Đổ bóng iOS nếu dùng sau này
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc',
    zIndex: 10,
  },
  dropdownButton: {
    fontSize: 18,
    fontWeight: '600',
    color: '#007bff',
  },
  headerIcons: {
    flexDirection: 'row',
  },
  iconCircle: {
    marginLeft: 10,
    borderWidth: 1,
    borderColor: '#007bff',
    borderRadius: 20,
    padding: 6,
    backgroundColor: '#f0f8ff', // Nền nhẹ để nhìn "nút"
    alignItems: 'center',
    justifyContent: 'center',
  },
});
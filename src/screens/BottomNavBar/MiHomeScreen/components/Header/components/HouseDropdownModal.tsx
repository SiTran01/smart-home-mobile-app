import React from 'react';
import { Modal, TouchableOpacity, View, Text, StyleSheet } from 'react-native';

type House = { _id: string; name: string };

interface Props {
  visible: boolean;
  houses: House[];
  onSelect: (house: House) => void;
  onClose: () => void;
  onManagePress: () => void;
  onManageRoomsPress: () => void; // ✅ thêm prop mới
}

const HouseDropdownModal: React.FC<Props> = ({
  visible,
  houses,
  onSelect,
  onClose,
  onManagePress,
  onManageRoomsPress,
}) => (
  <Modal visible={visible} transparent animationType="fade">
    <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={onClose}>
      <View style={styles.wrapper}>
        <View style={styles.dropdown}>
          {/* 🛠️ Quản lý phòng */}
          <TouchableOpacity onPress={onManageRoomsPress} style={[styles.item, styles.manage]}>
            <Text style={styles.manageText}>🛠️ Quản lý phòng</Text>
          </TouchableOpacity>

          {/* Danh sách Home */}
          {houses.map((house) => (
            <TouchableOpacity key={house._id} onPress={() => onSelect(house)} style={styles.item}>
              <Text>{house.name}</Text>
            </TouchableOpacity>
          ))}

          {/* 🛠️ Quản lý nhà */}
          <TouchableOpacity onPress={onManagePress} style={[styles.item, styles.manage]}>
            <Text style={styles.manageText}>🛠️ Quản lý nhà</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  </Modal>
);

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.2)' },
  wrapper: { position: 'absolute', top: 60, left: 16 },
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
  item: {
    padding: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc',
  },
  manage: {
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  manageText: {
    fontWeight: '600',
    color: '#1a53ff',
  },
});

export default HouseDropdownModal;

import React from 'react';
import { Modal, TouchableOpacity, View, Text, StyleSheet } from 'react-native';

interface Props {
  visible: boolean;
  onClose: () => void;
  onAddDevice: () => void;
  onScan: () => void;
  onCreateSmartScene: () => void;
}

const PlusMenuModal: React.FC<Props> = ({ visible, onClose, onAddDevice, onScan, onCreateSmartScene }) => (
  <Modal visible={visible} transparent animationType="fade">
    <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={onClose}>
      <View style={styles.wrapper}>
        <View style={styles.menu}>
          <TouchableOpacity style={styles.item} onPress={onAddDevice}>
            <Text>➕ Thêm thiết bị</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.item} onPress={onScan}>
            <Text>📷 Quét</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.item} onPress={onCreateSmartScene}>
            <Text>🧠 Tạo tình huống thông minh</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  </Modal>
);

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.2)' },
  wrapper: { position: 'absolute', top: 50, right: 10 },
  menu: {
    width: 220,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 8,
    elevation: 6,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
  },
  item: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc',
  },
});

export default PlusMenuModal;

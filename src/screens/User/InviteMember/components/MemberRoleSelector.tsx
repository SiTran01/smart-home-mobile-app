import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Button } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface Props {
  selectedRole: 'member' | 'admin';
  onSelectRole: (role: 'member' | 'admin') => void;
}

const MemberRoleSelector: React.FC<Props> = ({ selectedRole, onSelectRole }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [tempRole, setTempRole] = useState(selectedRole);

  const confirmSelection = () => {
    onSelectRole(tempRole);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.selector}>
        <Text style={styles.label}>Vai trò thành viên: {selectedRole === 'member' ? 'Thành viên' : 'Quản trị viên'}</Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Vai trò thành viên</Text>

            <TouchableOpacity
              style={[styles.roleRow, tempRole === 'member' && styles.selectedRow]}
              onPress={() => setTempRole('member')}
            >
              <Icon name="person" size={24} color="#555" />
              <Text style={styles.roleText}>Thành viên</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.roleRow, tempRole === 'admin' && styles.selectedRow]}
              onPress={() => setTempRole('admin')}
            >
              <Icon name="supervisor-account" size={24} color="#555" />
              <Text style={styles.roleText}>Quản trị viên</Text>
            </TouchableOpacity>

            <View style={styles.buttonRow}>
              <Button title="Hủy bỏ" onPress={() => setModalVisible(false)} />
              <Button title="Được rồi" onPress={confirmSelection} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default MemberRoleSelector;

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  selector: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
  },
  label: {
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 24,
    width: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  roleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  roleText: {
    marginLeft: 12,
    fontSize: 16,
  },
  selectedRow: {
    backgroundColor: '#eee',
    borderRadius: 8,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
  },
});

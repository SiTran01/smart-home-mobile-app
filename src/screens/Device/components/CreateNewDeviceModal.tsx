import React, { useState } from 'react';
import { Modal, View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';

interface Props {
  visible: boolean;
  onClose: () => void;
  onCreate: (deviceName: string) => void;
}

const CreateNewDeviceModal: React.FC<Props> = ({ visible, onClose, onCreate }) => {
  const [deviceName, setDeviceName] = useState('');

  const handleCreate = () => {
    if (!deviceName.trim()) return;

    onCreate(deviceName.trim());
    setDeviceName('');
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>Thêm thiết bị mới</Text>

          <TextInput
            placeholder="Tên thiết bị"
            value={deviceName}
            onChangeText={setDeviceName}
            style={styles.input}
          />

          <View style={styles.buttons}>
            <TouchableOpacity onPress={onClose} style={[styles.button, styles.cancel]}>
              <Text style={styles.buttonText}>Hủy</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleCreate} style={[styles.button, styles.create]}>
              <Text style={styles.buttonText}>Thêm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CreateNewDeviceModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    padding: 10,
    marginBottom: 16,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 6,
    marginLeft: 10,
  },
  cancel: {
    backgroundColor: '#ccc',
  },
  create: {
    backgroundColor: '#1a53ff',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
});

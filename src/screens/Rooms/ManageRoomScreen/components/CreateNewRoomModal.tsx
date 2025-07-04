import React, { useState } from 'react';
import { Modal, View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';

interface CreateNewRoomModalProps {
  visible: boolean;
  onClose: () => void;
  onAddRoom: (roomName: string) => void;
}

const CreateNewRoomModal: React.FC<CreateNewRoomModalProps> = ({
  visible,
  onClose,
  onAddRoom,
}) => {
  const [roomName, setRoomName] = useState('');

  const handleAdd = () => {
    const trimmedName = roomName.trim();
    if (!trimmedName) return;

    onAddRoom(trimmedName); // thằng cha sẽ xử lý API và state ngoài
    setRoomName('');
    onClose();
  };

  const handleClose = () => {
    setRoomName('');
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={handleClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>Thêm phòng mới</Text>

          <TextInput
            style={styles.input}
            placeholder="Tên phòng"
            value={roomName}
            onChangeText={setRoomName}
          />

          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: 'red' }]}
              onPress={handleClose}
            >
              <Text style={styles.buttonText}>Đóng</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, { backgroundColor: 'green' }]}
              onPress={handleAdd}
            >
              <Text style={styles.buttonText}>Thêm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CreateNewRoomModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 20,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    marginBottom: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 16,
    padding: 10,
    borderRadius: 4,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    padding: 12,
    borderRadius: 4,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

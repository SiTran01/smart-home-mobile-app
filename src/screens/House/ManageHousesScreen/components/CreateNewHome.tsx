import React, { useState } from 'react';
import { Modal, View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';

interface Props {
  visible: boolean;
  onClose: () => void;
  onCreate: (name: string) => void;
}

const CreateNewHome: React.FC<Props> = ({ visible, onClose, onCreate }) => {
  const [homeName, setHomeName] = useState('');

  const handleCreate = () => {
    if (!homeName.trim()) return;
    onCreate(homeName.trim());
    setHomeName('');
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>Tạo nhà mới</Text>
          <TextInput
            placeholder="Tên nhà"
            value={homeName}
            onChangeText={setHomeName}
            style={styles.input}
          />
          <View style={styles.buttons}>
            <TouchableOpacity onPress={onClose} style={[styles.button, styles.cancel]}>
              <Text style={styles.buttonText}>Hủy</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleCreate} style={[styles.button, styles.create]}>
              <Text style={styles.buttonText}>Tạo</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CreateNewHome;

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

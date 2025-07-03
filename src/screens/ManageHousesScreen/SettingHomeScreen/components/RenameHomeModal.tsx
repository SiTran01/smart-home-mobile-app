import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

interface RenameHomeModalProps {
  visible: boolean;
  currentName: string;
  onClose: () => void;
  onSave: (newName: string) => void;
}

const RenameHomeModal: React.FC<RenameHomeModalProps> = ({
  visible,
  currentName,
  onClose,
  onSave,
}) => {
  const [name, setName] = useState(currentName);

  useEffect(() => {
    setName(currentName); // reset name when modal opens
  }, [currentName, visible]);

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Đổi tên</Text>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Nhập tên mới"
              autoFocus
            />
            {name.length > 0 && (
              <TouchableOpacity onPress={() => setName('')}>
                <Icon name="times" size={20} color="#999" />
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.button} onPress={onClose}>
              <Text style={styles.buttonText}>Hủy</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.confirmButton]}
              onPress={() => onSave(name.trim())}
            >
              <Text style={[styles.buttonText, styles.confirmButtonText]}>Lưu</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default RenameHomeModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 16,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 40,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  button: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
  },
  confirmButton: {
    backgroundColor: '#1a53ff',
    marginLeft: 12,
  },
  buttonText: {
    fontSize: 16,
  },
  confirmButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
});

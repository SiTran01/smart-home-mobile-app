import React from 'react';
import { StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';

interface Props {
  name: string;
  onDelete: () => void;
}

const DeleteRoomButton: React.FC<Props> = ({ name, onDelete }) => {
  const handleDelete = () => {
    Alert.alert(
      'Xác nhận',
      `Bạn có chắc muốn xóa phòng "${name}" không?`,
      [
        { text: 'Hủy', style: 'cancel' },
        {
          text: 'Xóa',
          style: 'destructive',
          onPress: onDelete,
        },
      ]
    );
  };

  return (
    <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
      <Text style={styles.deleteText}>🗑️ Xóa phòng này</Text>
    </TouchableOpacity>
  );
};

export default DeleteRoomButton;

const styles = StyleSheet.create({
  deleteButton: {
    marginTop: 40,
    padding: 16,
    backgroundColor: '#ffe5e5',
    borderRadius: 10,
    alignItems: 'center',
  },
  deleteText: {
    color: '#cc0000',
    fontSize: 16,
    fontWeight: '600',
  },
});

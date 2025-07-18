import React from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity } from 'react-native';

interface Props {
  id: string;
  name: string;
  onDelete: (id: string) => void; // ✅ thêm callback do cha xử lý API/store
}

const DeleteHomeButton: React.FC<Props> = ({ id, name, onDelete }) => {
  const handleDelete = () => {
    Alert.alert(
      'Xác nhận',
      `Bạn có chắc muốn xóa gia đình "${name}" không?`,
      [
        { text: 'Hủy', style: 'cancel' },
        {
          text: 'Xóa',
          style: 'destructive',
          onPress: () => {
            onDelete(id); // ✅ gọi callback cha truyền xuống
          },
        },
      ]
    );
  };

  return (
    <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
      <Text style={styles.deleteText}>🗑️ Xóa gia đình này</Text>
    </TouchableOpacity>
  );
};

export default DeleteHomeButton;

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

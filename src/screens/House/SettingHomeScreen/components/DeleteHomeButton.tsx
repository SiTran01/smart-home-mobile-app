import React from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

import { deleteHome } from '../../../../services/api/homeApi';
import useHomeStore from '../../../../store/useHomeStore';

interface Props {
  id: string;
  name: string;
}

const DeleteHomeButton: React.FC<Props> = ({ id, name }) => {
  const navigation = useNavigation();
  const removeHome = useHomeStore((state) => state.deleteHome);

  const handleDelete = () => {
    Alert.alert(
      'Xác nhận',
      `Bạn có chắc muốn xóa gia đình "${name}" không?`,
      [
        { text: 'Hủy', style: 'cancel' },
        {
          text: 'Xóa',
          style: 'destructive',
          onPress: async () => {
            try {
              const token = await AsyncStorage.getItem('token');
              if (!token) {
                Alert.alert('Lỗi', 'Bạn chưa đăng nhập');
                return;
              }

              await deleteHome(token, id);
              removeHome(id);

              Alert.alert('Thành công', `Đã xóa gia đình "${name}"`);
              navigation.goBack();
            } catch (error) {
              console.error('❌ deleteHome error:', error);
              Alert.alert('Lỗi', 'Không thể xóa gia đình');
            }
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

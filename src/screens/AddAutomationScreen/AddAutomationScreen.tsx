import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/RootNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'AddAutomation'>;

const AddAutomationScreen: React.FC<Props> = ({ navigation }) => {
  const [name, setName] = useState('');
  const [condition, setCondition] = useState('');
  const [action, setAction] = useState('');

  const handleAddAutomation = () => {
    if (!name || !condition || !action) {
      Alert.alert('Lỗi', 'Vui lòng nhập đầy đủ thông tin');
      return;
    }

    // 🚀 TODO: Gọi API hoặc lưu vào database backend của bạn

    Alert.alert('Thành công', 'Đã thêm tự động hóa mới');
    navigation.goBack(); // Quay lại màn hình trước
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Thêm Automation mới</Text>

      <TextInput
        style={styles.input}
        placeholder="Tên automation"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Điều kiện (VD: Nhiệt độ > 30°C)"
        value={condition}
        onChangeText={setCondition}
      />

      <TextInput
        style={styles.input}
        placeholder="Hành động (VD: Bật quạt)"
        value={action}
        onChangeText={setAction}
      />

      <TouchableOpacity style={styles.button} onPress={handleAddAutomation}>
        <Text style={styles.buttonText}>Thêm automation</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddAutomationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#007bff',
    borderRadius: 8,
    padding: 14,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import CreateNewDeviceModal from './components/CreateNewDeviceModal';
import { createDevice } from '../../services/api/deviceApi';
import { getAllHomes } from '../../services/api/homeApi'; // ✅ import API getAllHomes

import useDeviceStore from '../../store/useDeviceStore';
import useHomeStore from '../../store/useHomeStore';

const AddDeviceScreen: React.FC = () => {
  const [showManualModal, setShowManualModal] = useState(false);
  const { addDevice } = useDeviceStore();
  const { selectedHomeId, setHomes } = useHomeStore(); // ✅ destructure setHomes

  const handleScanQRCode = () => {
    // TODO: Xử lý scan QR code sau
  };

  const handleManualAdd = () => {
    setShowManualModal(true);
  };

  const handleCreateDevice = async (deviceName: string) => {
    if (!selectedHomeId) {
      Alert.alert('Lỗi', 'Chưa chọn Home');
      return;
    }

    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        Alert.alert('Lỗi', 'Bạn chưa đăng nhập');
        return;
      }

      // ✅ Call API tạo device
      const newDevice = await createDevice(token, {
        name: deviceName,
        type: 'manual', // mặc định manual
        homeId: selectedHomeId,
        roomId: '', // nếu tạo ngoài room
      });

      // ✅ Cập nhật store device
      addDevice(newDevice);

      // ✅ Gọi getAllHomes ➔ update homeStore để rooms và devices count đúng realtime
      const allHomes = await getAllHomes(token);
      setHomes(allHomes);

      Alert.alert('Thành công', `Đã thêm thiết bị "${newDevice.name}"`);
    } catch (error) {
      console.error('Error creating device:', error);
      Alert.alert('Lỗi', 'Không thể thêm thiết bị');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Thêm thiết bị</Text>

      <TouchableOpacity style={styles.optionButton} onPress={handleScanQRCode}>
        <Icon name="qrcode-scan" size={24} color="#007bff" style={styles.icon} />
        <Text style={styles.optionText}>Quét mã QR</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.optionButton} onPress={handleManualAdd}>
        <Icon name="plus-box-outline" size={24} color="#007bff" style={styles.icon} />
        <Text style={styles.optionText}>Thêm thủ công</Text>
      </TouchableOpacity>

      <CreateNewDeviceModal
        visible={showManualModal}
        onClose={() => setShowManualModal(false)}
        onCreate={handleCreateDevice}
      />
    </View>
  );
};

export default AddDeviceScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#333',
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 10,
    backgroundColor: '#f0f4ff',
    marginBottom: 16,
  },
  icon: {
    marginRight: 12,
  },
  optionText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#007bff',
  },
});

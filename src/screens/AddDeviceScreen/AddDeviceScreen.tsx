import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const AddDeviceScreen: React.FC = () => {
  const handleScanQRCode = () => {
    Alert.alert('Quét mã QR', 'Tính năng đang phát triển...');
    // navigation.navigate('QRCodeScanner'); // nếu có sau này
  };

  const handleManualAdd = () => {
    Alert.alert('Thêm thủ công', 'Tính năng đang phát triển...');
    // navigation.navigate('ManualAddDevice');
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

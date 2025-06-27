import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ProfileScreen: React.FC = () => {
  const mockUser = {
    name: 'Nguyễn Văn A',
    email: 'nguyenvana@example.com',
    phone: '0123 456 789',
    address: '123 Đường ABC, Quận 1, TP.HCM',
    avatar: 'https://i.pravatar.cc/150?img=3', // ảnh mẫu random
    totalHouses: 3,
  };

  return (
    <ScrollView style={styles.container}>
      {/* Avatar + Tên */}
      <View style={styles.profileHeader}>
        <Image source={{ uri: mockUser.avatar }} style={styles.avatar} />
        <Text style={styles.name}>{mockUser.name}</Text>
        <Text style={styles.email}>{mockUser.email}</Text>
      </View>

      {/* Thông tin */}
      <View style={styles.infoSection}>
        <View style={styles.infoItem}>
          <Icon name="phone-outline" size={22} color="#007bff" style={styles.icon} />
          <Text style={styles.infoText}>{mockUser.phone}</Text>
        </View>

        <View style={styles.infoItem}>
          <Icon name="map-marker-outline" size={22} color="#007bff" style={styles.icon} />
          <Text style={styles.infoText}>{mockUser.address}</Text>
        </View>

        <View style={styles.infoItem}>
          <Icon name="home-group" size={22} color="#007bff" style={styles.icon} />
          <Text style={styles.infoText}>Đang quản lý {mockUser.totalHouses} nhà</Text>
        </View>
      </View>

      {/* Tùy chọn thêm */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Chỉnh sửa hồ sơ</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Đăng xuất</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  profileHeader: {
    alignItems: 'center',
    paddingVertical: 24,
    backgroundColor: '#f0f4ff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    marginBottom: 12,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  email: {
    fontSize: 14,
    color: '#555',
  },
  infoSection: {
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  icon: {
    marginRight: 12,
  },
  infoText: {
    fontSize: 16,
    color: '#333',
  },
  button: {
    marginHorizontal: 20,
    marginVertical: 8,
    backgroundColor: '#007bff',
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 16,
  },
});

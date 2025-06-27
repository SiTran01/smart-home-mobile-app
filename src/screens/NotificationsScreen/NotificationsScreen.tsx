import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const dummyNotifications = [
  {
    id: '1',
    title: 'Thiết bị mới được thêm',
    description: 'Bạn vừa thêm Đèn phòng khách vào Nhà A.',
    time: '2 phút trước',
  },
  {
    id: '2',
    title: 'Cảnh báo nhiệt độ',
    description: 'Nhiệt độ phòng ngủ vượt quá 30°C.',
    time: '1 giờ trước',
  },
  {
    id: '3',
    title: 'Đã cập nhật phần mềm',
    description: 'Bản cập nhật cho thiết bị cảm biến đã được cài đặt.',
    time: 'Hôm qua',
  },
];

const NotificationsScreen: React.FC = () => {
  const renderItem = ({ item }: { item: typeof dummyNotifications[0] }) => (
    <View style={styles.notificationItem}>
      <Icon
        name="bell-ring-outline"
        size={24}
        color="#007bff"
        style={styles.icon}
      />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.time}>{item.time}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={dummyNotifications}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.contentContainer}
      />
    </View>
  );
};

export default NotificationsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    padding: 16,
  },
  notificationItem: {
    flexDirection: 'row',
    marginBottom: 20,
    backgroundColor: '#f2f7ff',
    padding: 12,
    borderRadius: 10,
    alignItems: 'flex-start',
  },
  icon: {
    marginRight: 10,
    marginTop: 4,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
    color: '#1a1a1a',
  },
  description: {
    color: '#444',
  },
  time: {
    color: '#888',
    fontSize: 12,
    marginTop: 4,
  },
});

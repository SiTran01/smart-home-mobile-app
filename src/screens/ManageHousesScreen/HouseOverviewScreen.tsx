import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../../App';

type HouseOverviewRouteProp = RouteProp<RootStackParamList, 'HouseOverview'>;

type Props = {
  route: HouseOverviewRouteProp;
};

const HouseOverviewScreen: React.FC<Props> = ({ route }) => {
  const { id, name } = route.params;

  const handleDelete = () => {
    Alert.alert(
      'Xác nhận',
      `Bạn có chắc muốn xóa gia đình "${name}" không?`,
      [
        { text: 'Hủy', style: 'cancel' },
        { text: 'Xóa', style: 'destructive', onPress: () => console.log('Đã xóa', id) },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🏠 {name}</Text>

      <View style={styles.section}>
        <Text style={styles.label}>Tổng thiết bị:</Text>
        <Text style={styles.value}>12 thiết bị</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Các phòng:</Text>
        <Text style={styles.value}>Phòng khách, Bếp, Phòng ngủ</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Thành viên:</Text>
        <Text style={styles.value}>Bạn, Mẹ, Em gái</Text>
      </View>

      <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
        <Text style={styles.deleteText}>🗑️ Xóa gia đình này</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HouseOverviewScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 20,
    textAlign: 'center',
  },
  section: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
  },
  value: {
    fontSize: 16,
    marginTop: 4,
    color: '#444',
  },
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

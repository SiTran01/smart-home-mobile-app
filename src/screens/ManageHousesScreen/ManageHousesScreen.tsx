import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App';
import Icon from 'react-native-vector-icons/FontAwesome';

type Props = NativeStackScreenProps<RootStackParamList, 'ManageHouses'>;

const houses = [
  { id: '1', name: 'Nhà A' },
  { id: '2', name: 'Nhà B' },
  { id: '3', name: 'Nhà C' },
];

const ManageHousesScreen: React.FC<Props> = ({ navigation }) => {
  const handleSelectHouse = (house: { id: string; name: string }) => {
    navigation.navigate('HouseDetail', {
      id: house.id,
      name: house.name,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🏠 Trình quản lý nhà riêng</Text>

      <FlatList
        data={houses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => handleSelectHouse(item)}
          >
            <Text style={styles.cardText}>{item.name}</Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.list}
      />

      {/* Nút tròn thêm nhà */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => alert('Chức năng Thêm nhà đang phát triển')}
      >
        <Icon name="plus" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

export default ManageHousesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 16,
  },
  list: {
    paddingBottom: 80, // để tránh che nội dung bởi nút tròn
  },
  card: {
    padding: 16,
    backgroundColor: '#f1f1f1',
    borderRadius: 10,
    marginBottom: 12,
  },
  cardText: {
    fontSize: 18,
  },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    backgroundColor: '#1a53ff',
    borderRadius: 28,
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
});

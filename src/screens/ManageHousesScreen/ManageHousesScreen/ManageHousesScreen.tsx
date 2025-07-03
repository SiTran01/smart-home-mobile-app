import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../navigation/RootNavigator';
import Icon from 'react-native-vector-icons/FontAwesome';
import useHomeStore from '../../../store/useHomeStore';
import CreateNewHome from './components/CreateNewHome';
import { createHome } from '../../../services/homeApi/homeApi';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Props = NativeStackScreenProps<RootStackParamList, 'ManageHouses'>;

const ManageHousesScreen: React.FC<Props> = ({ navigation }) => {
  const homes = useHomeStore(state => state.homes);
  const addHome = useHomeStore(state => state.addHome);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const handleSelectHouse = (house: { _id: string; name: string }) => {
    navigation.navigate('SettingHome', {
      id: house._id,
      name: house.name,
    });
  };

  const handleCreateHome = async (homeName: string) => {
  try {
    const token = await AsyncStorage.getItem('token');
    if (!token) {
      Alert.alert('Lỗi', 'Bạn chưa đăng nhập');
      return;
    }

    const newHome = await createHome(token, { name: homeName }); // ✅ sửa ở đây
    addHome(newHome);
    setShowCreateModal(false);
    Alert.alert('Thành công', `Đã tạo nhà: ${newHome.name}`);
  } catch (error) {
    console.error('❌ createHome error:', error);
    Alert.alert('Lỗi', 'Không thể tạo nhà mới');
  }
};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🏠 Trình quản lý nhà riêng</Text>

      <FlatList
        data={homes}
        keyExtractor={(item) => item._id}
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

      <TouchableOpacity
        style={styles.fab}
        onPress={() => setShowCreateModal(true)}
      >
        <Icon name="plus" size={24} color="#fff" />
      </TouchableOpacity>

      <CreateNewHome
        visible={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onCreate={handleCreateHome}
      />
    </View>
  );
};

export default ManageHousesScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingHorizontal: 16, paddingTop: 24 },
  title: { fontSize: 22, fontWeight: '700', textAlign: 'center', marginBottom: 16 },
  list: { paddingBottom: 80 },
  card: { padding: 16, backgroundColor: '#f1f1f1', borderRadius: 10, marginBottom: 12 },
  cardText: { fontSize: 18 },
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

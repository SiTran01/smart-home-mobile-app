import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { RootStackParamList } from '../../../navigation/RootNavigator';
import useHomeStore from '../../../store/useHomeStore';
import { createHome } from '../../../services/api/homeApi';

import HomeCard from './components/HomeCard';
import CreateNewHome from './components/CreateNewHome';

type Props = NativeStackScreenProps<RootStackParamList, 'ManageHouses'>;

const ManageHousesScreen: React.FC<Props> = ({ navigation }) => {
  const homes = useHomeStore(state => state.homes);
  const addHome = useHomeStore(state => state.addHome);
  const setSelectedHomeId = useHomeStore(state => state.setSelectedHomeId);
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

      const newHome = await createHome(token, { name: homeName });
      addHome(newHome);
      // ✅ Set selectedHomeId là home mới vừa tạo
      setSelectedHomeId(newHome._id);
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
          <HomeCard
            name={item.name}
            onPress={() => handleSelectHouse(item)}
          />
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

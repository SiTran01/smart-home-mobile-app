import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { RootStackParamList } from '../../../navigation/RootNavigator';
import HeaderHomeInfo from './components/HomeInfo';
import SettingHomeOptionRow from './components/SettingOptionRow';
import DeleteHomeButton from './components/DeleteHomeButton';
import RenameHomeModal from './components/RenameHomeModal';

import { updateHome } from '../../../services/api/homeApi';
import useHomeStore from '../../../store/useHomeStore';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type SettingHomeRouteProp = RouteProp<RootStackParamList, 'SettingHome'>;

const SettingHomeScreen: React.FC = () => {
  const route = useRoute<SettingHomeRouteProp>();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const { id, name } = route.params;

  const [showRenameModal, setShowRenameModal] = useState(false);
  const [homeName, setHomeName] = useState(name);

  const { homes, updateHome: updateHomeInStore } = useHomeStore();

  // 🔄 Always get latest currentHome from store
  const currentHome = homes.find(home => home._id === id);

  // ✅ Calculate counts dynamically to ensure always up-to-date
  const roomsCount = currentHome?.rooms?.length ?? 0;
  const devicesCount = currentHome?.devices?.length ?? 0;
  const membersCount = currentHome?.members ? currentHome.members.length + 1 : 1;

  const handleRename = async (newName: string) => {
    if (!newName || newName === homeName) {
      setShowRenameModal(false);
      return;
    }

    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        Alert.alert('Lỗi', 'Bạn chưa đăng nhập');
        return;
      }

      const updatedHome = await updateHome(token, id, { name: newName });
      updateHomeInStore(updatedHome);

      setHomeName(updatedHome.name);

      Alert.alert('Thành công', `Đã đổi tên thành "${updatedHome.name}"`);
    } catch (error) {
      console.error('❌ Rename home error:', error);
      Alert.alert('Lỗi', 'Không thể đổi tên nhà');
    } finally {
      setShowRenameModal(false);
    }
  };

  return (
    <View style={styles.container}>
      <HeaderHomeInfo
        name={homeName}
        rooms={roomsCount}
        members={membersCount}
      />

      <SettingHomeOptionRow
        label="Tên"
        value={homeName}
        onPress={() => setShowRenameModal(true)}
      />

      <SettingHomeOptionRow
        label="Quản lý phòng"
        value={`${roomsCount}`}
        onPress={() => navigation.navigate('ManageRoom', { homeId: id })}
      />

      <SettingHomeOptionRow
        label="Thiết bị"
        value={`${devicesCount}`}
        onPress={() => {}}
      />

      <DeleteHomeButton id={id} name={homeName} />

      <RenameHomeModal
        visible={showRenameModal}
        currentName={homeName}
        onClose={() => setShowRenameModal(false)}
        onSave={handleRename}
      />
    </View>
  );
};

export default SettingHomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 24,
  },
});

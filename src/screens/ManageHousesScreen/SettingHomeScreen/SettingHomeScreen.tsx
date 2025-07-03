import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { RootStackParamList } from '../../../navigation/RootNavigator';
import HeaderHomeInfo from './components/HomeInfo';
import SettingHomeOptionRow from './components/SettingOptionRow';
import DeleteHomeButton from './components/DeleteHomeButton';
import RenameHomeModal from './components/RenameHomeModal';

import { updateHome } from '../../../services/homeApi/homeApi';
import useHomeStore from '../../../store/useHomeStore';

type SettingHomeRouteProp = RouteProp<RootStackParamList, 'SettingHome'>;

const SettingHomeScreen: React.FC = () => {
  const route = useRoute<SettingHomeRouteProp>();
  const { id, name } = route.params;

  const [showRenameModal, setShowRenameModal] = useState(false);
  const [homeName, setHomeName] = useState(name);

  const updateHomeInStore = useHomeStore((state) => state.updateHome);

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

      updateHomeInStore(updatedHome); // ✅ update store
      setHomeName(updatedHome.name); // ✅ update local UI

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
      <HeaderHomeInfo name={homeName} rooms={3} members={2} />

      <SettingHomeOptionRow
        label="Tên"
        value={homeName}
        onPress={() => setShowRenameModal(true)}
      />
      <SettingHomeOptionRow label="Quản lý phòng" value="3" onPress={() => {}} />
      <SettingHomeOptionRow label="Thiết bị" value="12" onPress={() => {}} />

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

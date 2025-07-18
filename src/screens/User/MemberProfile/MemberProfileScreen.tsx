import React, { useEffect, useState } from 'react';
import { ScrollView, Alert } from 'react-native';
import { useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import MemberAvatar from './components/MemberAvatar';
import MemberInfo from './components/MemberInfo';
import RemoveMemberButton from './components/RemoveMemberButton';
import useHomeStore from '../../../store/useHomeStore';

import { removeMember } from '../../../services/api/inviteMemberApi'; // 👈 import API
import { useNavigation } from '@react-navigation/native';


const MemberProfileScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { memberId } = route.params as { memberId: string };

  console.log('✅ Member ID received:', memberId);

  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('token');
        setToken(storedToken);
        console.log('🔑 Token fetched:', storedToken);
      } catch (err) {
        console.error('❌ Error fetching token:', err);
        setToken(null);
      }
    };

    fetchToken();
  }, []);

  const { homes, selectedHomeId, setHomes } = useHomeStore();
  const currentHome = homes.find(h => h._id === selectedHomeId);

  // 📝 Tìm member trong home store
  let member;

  // Check owner
  if (currentHome?.owner && (currentHome.owner as any)._id === memberId) {
    member = {
      _id: memberId,
      name: (currentHome.owner as any).name,
      email: (currentHome.owner as any).email,
      picture: (currentHome.owner as any).picture,
      role: 'owner',
      alias: (currentHome.owner as any).name, // 👈 owner alias default to name
    };
  } else {
    // Check members list
    const found = currentHome?.members.find(m => (m.user as any)._id === memberId);
    if (found) {
      member = {
        _id: memberId,
        name: (found.user as any).name,
        email: (found.user as any).email,
        picture: (found.user as any).picture,
        role: found.role,
        alias: found.alias || (found.user as any).name, // 👈 lấy alias, fallback to name
      };
    }
  }

  if (!member) {
    return (
      <ScrollView>
        <MemberInfo name="Không tìm thấy thành viên" email="" role="member" />
      </ScrollView>
    );
  }

  const handleRemove = async () => {
    Alert.alert(
      'Xác nhận xoá',
      `Bạn có chắc chắn muốn xoá ${member.alias} khỏi Home?`,
      [
        { text: 'Huỷ', style: 'cancel' },
        {
          text: 'Xoá',
          style: 'destructive',
          onPress: async () => {
            try {
              if (!token || !selectedHomeId) {
                Alert.alert('Lỗi', 'Không tìm thấy token hoặc Home.');
                return;
              }

              const result = await removeMember(token, selectedHomeId, memberId);
              console.log('✅ [RemoveMember API response]:', JSON.stringify(result, null, 2));
              console.log('✅ Member removed:', result);

              // ✅ Update local store nếu cần
              const updatedHomes = homes.map(home => {
                if (home._id === selectedHomeId) {
                  return {
                    ...home,
                    members: home.members.filter(m => (m.user as any)._id !== memberId),
                  };
                }
                return home;
              });

              setHomes(updatedHomes);

              Alert.alert('Đã xoá', `${member.alias} đã bị xoá khỏi Home.`);
              navigation.goBack(); // 👈 Thêm dòng này để quay lại sau khi xoá
            } catch (err) {
              console.error('❌ Error removing member:', err);
              Alert.alert('Lỗi', 'Không thể xoá thành viên. Vui lòng thử lại.');
            }
          },
        },
      ]
    );
  };

  return (
    <ScrollView>
      <MemberAvatar avatarUrl={member.picture} alias={member.alias} />
      <MemberInfo email={member.email} name={member.name} role={member.role as 'owner' | 'admin' | 'member'} />
      <RemoveMemberButton onRemove={handleRemove} />
    </ScrollView>
  );
};

export default MemberProfileScreen;

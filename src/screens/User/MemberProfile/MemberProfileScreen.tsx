import React from 'react';
import { ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';

import MemberAvatar from './components/MemberAvatar';
import MemberInfo from './components/MemberInfo';
import RemoveMemberButton from './components/RemoveMemberButton';

const MemberProfileScreen = () => {
  const route = useRoute();
  const { memberId } = route.params as { memberId: string };

  console.log('✅ Member ID received:', memberId);

  // 📝 TODO: Fetch member detail từ API bằng memberId
  // Dữ liệu giả demo
  const member = {
    avatarUrl: 'https://i.pravatar.cc/150?img=3',
    alias: 'Hưng Root',
    email: 'hung.root@example.com',
    name: 'Hưng Nguyễn',
    role: 'admin' as 'owner' | 'admin' | 'member',
  };

  const handleRemove = () => {
    console.log('🗑️ Xóa thành viên:', memberId, member.name);
    // TODO: Call API remove member here
  };

  return (
    <ScrollView>
      <MemberAvatar avatarUrl={member.avatarUrl} alias={member.alias} />
      <MemberInfo email={member.email} name={member.name} role={member.role} />
      <RemoveMemberButton onRemove={handleRemove} />
    </ScrollView>
  );
};

export default MemberProfileScreen;

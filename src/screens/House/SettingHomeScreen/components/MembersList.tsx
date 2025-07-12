import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

export interface Member {
  _id: string;
  name: string;
  role: 'owner' | 'admin' | 'member';
  avatarUrl?: string;
}

interface Props {
  members: Member[];
  currentUserId: string;
  onInvitePress?: () => void; // 🆕 thêm prop callback
}

const MembersList: React.FC<Props> = ({ members, currentUserId, onInvitePress }) => {
  const sortedMembers = [...members].sort((a, b) => {
    const rolePriority = { owner: 0, admin: 1, member: 2 };
    return rolePriority[a.role] - rolePriority[b.role];
  });

  const defaultAvatar = require('../../../../assets/avatar-placeholder.png');

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Thành viên ({members.length})</Text>

      {sortedMembers.map((item) => {
        const isCurrentUser = item._id === currentUserId;
        const roleDisplay =
          item.role === 'owner'
            ? 'Người sở hữu'
            : item.role === 'admin'
            ? 'Admin'
            : 'Thành viên';

        return (
          <View key={item._id} style={styles.memberRow}>
            <Image
              source={item.avatarUrl ? { uri: item.avatarUrl } : defaultAvatar}
              style={styles.avatar}
            />
            <View style={styles.info}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.role}>
                {roleDisplay}
                {isCurrentUser ? ' (Bạn)' : ''}
              </Text>
            </View>
          </View>
        );
      })}

      {/* ➕ Mời thành viên mới */}
      <TouchableOpacity style={styles.inviteRow} onPress={onInvitePress}>
        <View style={styles.plusCircle}>
          <Text style={styles.plusText}>+</Text>
        </View>
        <Text style={styles.inviteText}>Mời thành viên mới</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MembersList;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 12,
  },
  memberRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
    backgroundColor: '#ccc',
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 16,
  },
  role: {
    fontSize: 14,
    color: '#777',
  },
  inviteRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  plusCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#777',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  plusText: {
    fontSize: 18,
    color: '#777',
    lineHeight: 20,
  },
  inviteText: {
    fontSize: 16,
    color: '#777',
    fontWeight: '500',
  },
});

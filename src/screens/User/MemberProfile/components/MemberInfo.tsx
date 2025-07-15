import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface MemberInfoProps {
  email: string;
  name: string;
  role: 'owner' | 'admin' | 'member';
}

const MemberInfo: React.FC<MemberInfoProps> = ({ email, name, role }) => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.label}>Tài khoản</Text>
        <Text style={styles.value}>{email}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Tên</Text>
        <Text style={styles.value}>{name}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Vai trò thành viên</Text>
        <Text style={styles.value}>
          {role === 'owner' ? 'Chủ sở hữu' : role === 'admin' ? 'Quản trị viên' : 'Thành viên'}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  label: {
    fontWeight: '600',
  },
  value: {
    color: '#555',
  },
});

export default MemberInfo;

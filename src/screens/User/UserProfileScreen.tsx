import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

const UserProfileScreen: React.FC = () => {
  const user = {
    avatar: 'https://i.pravatar.cc/150?img=3',
    nickname: 'vinh',
    email: 'tvinh0081@gmail.com',
    twitter: 'không ràng buộc',
  };

  return (
    <ScrollView style={styles.container}>
      {/* Ảnh đại diện */}
      <TouchableOpacity style={styles.row}>
        <Text style={styles.label}>Ảnh đại diện</Text>
        <View style={styles.avatarBlock}>
          <Image source={{ uri: user.avatar }} style={styles.avatar} />
          <MaterialIcon name="chevron-right" size={24} color="#888" />
        </View>
      </TouchableOpacity>

      {/* Biệt danh */}
      <TouchableOpacity style={styles.row}>
        <Text style={styles.label}>Biệt danh</Text>
        <View style={styles.valueBlock}>
          <Text style={styles.value}>{user.nickname}</Text>
          <MaterialIcon name="chevron-right" size={24} color="#888" />
        </View>
      </TouchableOpacity>

      {/* Email */}
      <View style={styles.row}>
        <Text style={styles.label}>Email</Text>
        <Text style={styles.value}>{user.email}</Text>
      </View>

      {/* Twitter */}
      <TouchableOpacity style={styles.row}>
        <Text style={styles.label}>Twitter</Text>
        <View style={styles.valueBlock}>
          <Text style={styles.value}>{user.twitter}</Text>
          <MaterialIcon name="chevron-right" size={24} color="#888" />
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default UserProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    justifyContent: 'space-between',
  },
  label: {
    fontSize: 16,
    color: '#333',
  },
  avatarBlock: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 8,
  },
  valueBlock: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  value: {
    fontSize: 16,
    color: '#555',
    marginRight: 8,
  },
});

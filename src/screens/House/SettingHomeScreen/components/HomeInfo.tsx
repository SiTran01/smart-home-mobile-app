import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface Props {
  name: string;
  rooms: number;
  members: number;
}

const HeaderHomeInfo: React.FC<Props> = ({ name, rooms, members }) => (
  <View style={styles.container}>
    <Text style={styles.title}>🏠 {name}</Text>
    <Text style={styles.sub}>{rooms} phòng | {members} thành viên</Text>
  </View>
);

export default HeaderHomeInfo;

const styles = StyleSheet.create({
  container: { marginBottom: 20, alignItems: 'center' },
  title: { fontSize: 24, fontWeight: '700' },
  sub: { fontSize: 16, color: '#444', marginTop: 8 },
});

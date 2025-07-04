import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

type Props = {
  name: string;
  rooms: number;
  members: number;
  onPress: () => void;
};

const ThisHome: React.FC<Props> = ({ name, rooms, members, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.subtitle}>
          {rooms} Phòng | {members} thành viên
        </Text>
      </View>
      <Icon name="chevron-right" size={24} color="#888" />
    </TouchableOpacity>
  );
};

export default ThisHome;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f0f4ff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
});

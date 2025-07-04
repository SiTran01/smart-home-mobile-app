import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';

interface RoomCardProps {
  name: string;
  onPress: () => void;
  style?: ViewStyle;
}

const RoomCard: React.FC<RoomCardProps> = ({ name, onPress, style }) => {
  return (
    <TouchableOpacity style={[styles.card, style]} onPress={onPress}>
      <Text style={styles.roomName}>{name}</Text>
    </TouchableOpacity>
  );
};

export default RoomCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f1f1f1',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  roomName: {
    fontSize: 16,
  },
});

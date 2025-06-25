// src/components/HouseCard.tsx
import React from 'react';
import { Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

type Props = {
  name: string;
  onPress: () => void;
};

const cardWidth = Dimensions.get('window').width / 2 - 24; // 50% width trừ padding

const HouseCard: React.FC<Props> = ({ name, onPress }) => {
  return (
    <TouchableOpacity style={[styles.card, { width: cardWidth }]} onPress={onPress}>
      <Icon name="home" size={48} color="#4a90e2" style={styles.icon} />
      <Text style={styles.name}>{name}</Text>
    </TouchableOpacity>
  );
};

export default HouseCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#eef2f7',
    margin: 8,
    borderRadius: 12,
    alignItems: 'center',
    paddingVertical: 20,
    elevation: 2,
  },
  icon: {
    marginBottom: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
});

import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';

interface HomeCardProps {
  name: string;
  onPress: () => void;
  style?: ViewStyle;
}

const HomeCard: React.FC<HomeCardProps> = ({ name, onPress, style }) => {
  return (
    <TouchableOpacity style={[styles.card, style]} onPress={onPress}>
      <Text style={styles.cardText}>{name}</Text>
    </TouchableOpacity>
  );
};

export default HomeCard;

const styles = StyleSheet.create({
  card: {
    padding: 16,
    backgroundColor: '#f1f1f1',
    borderRadius: 10,
    marginBottom: 12,
  },
  cardText: {
    fontSize: 18,
  },
});

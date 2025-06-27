import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface Props {
  onAddAutomation: () => void;
}

const AutomationHeader: React.FC<Props> = ({ onAddAutomation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tự động hóa</Text>
      <TouchableOpacity onPress={onAddAutomation} style={styles.iconButton}>
        <Icon name="plus" size={28} color="#007bff" />
      </TouchableOpacity>
    </View>
  );
};

export default AutomationHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  iconButton: {
    padding: 4,
  },
});

import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

interface Accessory {
  id: string;
  name: string;
  type: string;
}

const accessories: Accessory[] = [
  { id: '1', name: 'Smart Plug', type: 'Power Control' },
  { id: '2', name: 'Motion Sensor', type: 'Security' },
  { id: '3', name: 'Smart Bulb', type: 'Lighting' },
];

const AccessoriesScreen: React.FC = () => {
  const renderItem = ({ item }: { item: Accessory }) => (
    <View style={styles.item}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.type}>{item.type}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Automation Accessories</Text>
      <FlatList
        data={accessories}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
};

export default AccessoriesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f6f8',
    padding: 16,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  item: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 2,
  },
  name: {
    fontSize: 18,
    fontWeight: '500',
    color: '#007bff',
  },
  type: {
    fontSize: 14,
    color: '#666',
  },
});

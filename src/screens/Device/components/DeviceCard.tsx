import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DeviceCard = ({ device }: { device: any }) => (
  <View style={styles.card}>
    <Text style={styles.name}>{device.name}</Text>
    <Text style={styles.type}>Loại: {device.type}</Text>
    <Text style={styles.status}>Trạng thái: {JSON.stringify(device.status)}</Text>
  </View>
);

export default DeviceCard;

const styles = StyleSheet.create({
  card: {
    padding: 12,
    marginBottom: 8,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
  },
  name: {
    fontWeight: '600',
    fontSize: 16,
  },
  type: {
    marginTop: 4,
    color: '#555',
  },
  status: {
    marginTop: 4,
    color: '#777',
  },
});

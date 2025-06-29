import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

const TwitterRow: React.FC = () => {
  return (
    <TouchableOpacity style={styles.row}>
      <Text style={styles.label}>Twitter</Text>
      <View style={styles.valueBlock}>
        <Text style={styles.value}>không ràng buộc</Text>
        <MaterialIcon name="chevron-right" size={24} color="#888" />
      </View>
    </TouchableOpacity>
  );
};

export default TwitterRow;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    justifyContent: 'space-between',
  },
  label: { fontSize: 16, color: '#333' },
  valueBlock: { flexDirection: 'row', alignItems: 'center' },
  value: { fontSize: 16, color: '#555', marginRight: 8 },
});

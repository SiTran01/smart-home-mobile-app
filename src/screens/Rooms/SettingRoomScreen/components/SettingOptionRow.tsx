import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface SettingOptionRowProps {
  label: string;
  value?: string | number;
  onPress?: () => void;
}

const SettingOptionRow: React.FC<SettingOptionRowProps> = ({ label, value = '', onPress }) => (
  <TouchableOpacity style={styles.row} onPress={onPress} activeOpacity={0.7}>
    <Text style={styles.label}>{label}</Text>
    <View style={styles.right}>
      <Text style={styles.value}>{value}</Text>
      <Ionicons name="chevron-forward" size={20} color="#999" />
    </View>
  </TouchableOpacity>
);

export default SettingOptionRow;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  label: { fontSize: 16 },
  right: { flexDirection: 'row', alignItems: 'center' },
  value: { fontSize: 16, color: '#555', marginRight: 8 },
});

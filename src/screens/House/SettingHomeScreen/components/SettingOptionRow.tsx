import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';


interface Props {
  label: string;
  value: string;
  onPress: () => void;
}

const SettingHomeOptionRow: React.FC<Props> = ({ label, value, onPress }) => (
  <TouchableOpacity style={styles.row} onPress={onPress}>
    <Text style={styles.label}>{label}</Text>
    <View style={styles.right}>
      <Text style={styles.value}>{value}</Text>
      <Icon name="chevron-right" size={20} color="#999" />
    </View>
  </TouchableOpacity>
);

export default SettingHomeOptionRow;

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

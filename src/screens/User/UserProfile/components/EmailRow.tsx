import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface Props {
  email: string;
}

const EmailRow: React.FC<Props> = ({ email }) => {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>Email</Text>
      <Text style={styles.value}>{email}</Text>
    </View>
  );
};

export default EmailRow;

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
  value: { fontSize: 16, color: '#555' },
});

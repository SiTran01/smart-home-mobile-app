import React from 'react';
import { TextInput, StyleSheet, TextInputProps } from 'react-native';

const InputField: React.FC<TextInputProps> = (props) => {
  return <TextInput style={styles.input} {...props} />;
};

export default InputField;

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
});

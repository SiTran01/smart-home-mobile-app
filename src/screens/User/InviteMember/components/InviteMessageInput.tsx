import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

interface Props {
  message: string;
  onMessageChange: (text: string) => void;
}

const InviteMessageInput: React.FC<Props> = ({ message, onMessageChange }) => {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Nhập thông tin lời mời"
        value={message}
        onChangeText={onMessageChange}
        style={styles.input}
        multiline
      />
    </View>
  );
};

export default InviteMessageInput;

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    minHeight: 80,
    textAlignVertical: 'top',
  },
});

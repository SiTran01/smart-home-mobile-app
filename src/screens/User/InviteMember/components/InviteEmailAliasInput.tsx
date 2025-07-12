import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

interface Props {
  email: string;
  onEmailChange: (text: string) => void;
  alias: string;
  onAliasChange: (text: string) => void;
}

const InviteEmailAliasInput: React.FC<Props> = ({
  email, onEmailChange, alias, onAliasChange,
}) => {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Nhập email người mời"
        value={email}
        onChangeText={onEmailChange}
        style={styles.input}
      />
      <TextInput
        placeholder="Nhập bí danh"
        value={alias}
        onChangeText={onAliasChange}
        style={styles.input}
      />
    </View>
  );
};

export default InviteEmailAliasInput;

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
});

import React from 'react';
import { View, Button, StyleSheet, Alert } from 'react-native';

interface RemoveMemberButtonProps {
  onRemove: () => void;
}

const RemoveMemberButton: React.FC<RemoveMemberButtonProps> = ({ onRemove }) => {
  const confirmRemove = () => {
    Alert.alert(
      'Xác nhận xóa',
      'Bạn có chắc muốn xóa thành viên này khỏi Home?',
      [
        { text: 'Hủy', style: 'cancel' },
        { text: 'Xóa', style: 'destructive', onPress: onRemove },
      ],
      { cancelable: true },
    );
  };

  return (
    <View style={styles.container}>
      <Button title="Xóa thành viên" color="red" onPress={confirmRemove} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    paddingHorizontal: 20,
  },
});

export default RemoveMemberButton;

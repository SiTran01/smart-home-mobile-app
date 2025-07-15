import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

interface MemberAvatarProps {
  avatarUrl: string;
  alias: string;
}

const MemberAvatar: React.FC<MemberAvatarProps> = ({ avatarUrl, alias }) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: avatarUrl }} style={styles.avatar} />
      <Text style={styles.alias}>{alias}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  alias: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default MemberAvatar;

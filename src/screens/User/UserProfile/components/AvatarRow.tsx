import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

interface Props {
  picture: string;
}

const AvatarRow: React.FC<Props> = ({ picture }) => {
  return (
    <TouchableOpacity style={styles.row}>
      <Text style={styles.label}>Ảnh đại diện</Text>
      <View style={styles.pictureBlock}>
        {picture ? (
          <Image source={{ uri: picture }} style={styles.picture} />
        ) : (
          <View style={styles.nopicture}>
            <Text style={{ color: '#888' }}>No picture</Text>
          </View>
        )}
        <MaterialIcon name="chevron-right" size={24} color="#888" />
      </View>
    </TouchableOpacity>
  );
};

export default AvatarRow;

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
  pictureBlock: { flexDirection: 'row', alignItems: 'center' },
  picture: { width: 48, height: 48, borderRadius: 24, marginRight: 8 },
  nopicture: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
});

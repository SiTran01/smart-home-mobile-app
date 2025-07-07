import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import DeviceCard from '../../../../Device/components/DeviceCard';

interface Device {
  _id: string;
  name: string;
  type: string;
  status: any;
  home: string;
}

interface Props {
  devices: Device[];
}

const MiHomeBody: React.FC<Props> = ({ devices }) => {
  return (
    <View style={styles.container}>
      {devices.length === 0 ? (
        <Text style={styles.emptyText}>Chưa có thiết bị nào trong home này</Text>
      ) : (
        devices.map((device) => (
          <DeviceCard key={device._id} device={device} />
        ))
      )}
    </View>
  );
};

export default MiHomeBody;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  emptyText: {
    textAlign: 'center',
    color: '#888',
    fontSize: 16,
  },
});

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

type WidgetItem = {
  id: string;
  name: string;
  icon: string;
};

const items: WidgetItem[] = [
  { id: '1', name: 'Forum', icon: 'forum' },
  { id: '2', name: 'Kết nối hệ sinh thái', icon: 'hub' },
  { id: '3', name: 'Last Update', icon: 'update' },
  { id: '4', name: 'Cài đặt', icon: 'settings' },
  { id: '5', name: 'Trợ giúp & Phản hồi', icon: 'help-outline' },
];

type Props = {
  onPressItem?: (item: WidgetItem) => void;
};

const DashboardWidgets: React.FC<Props> = ({ onPressItem }) => {
  const handlePress = (item: WidgetItem) => {
    if (onPressItem) {
      onPressItem(item);
    }
  };

  return (
    <View style={styles.container}>
      {items.map((item) => (
        <TouchableOpacity
          key={item.id}
          style={styles.row}
          onPress={() => handlePress(item)}
        >
          <MaterialIcon name={item.icon} size={24} color="#007bff" style={styles.icon} />
          <Text style={styles.text}>{item.name}</Text>
          <MaterialIcon name="chevron-right" size={24} color="#888" />
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default DashboardWidgets;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    marginTop: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  icon: {
    marginRight: 16,
  },
  text: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
});
